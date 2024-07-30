import { Auth } from "./components/auth";
import "./App.css";
import { auth, db, storage } from "./config/FirebaseConig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  // !new movie statae
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieDate, setNewMovieDate] = useState(0);
  const [isOscar, setIsOscar] = useState(true);
  // ! update state

  const [updatedTitle, setUpdatedTitle] = useState("");
  // !files upload state

  const [fileUpload, setFileUpload] = useState();
  const getMovieList = async () => {
    // !read the data from fireabse store
    // ! set Movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterdData);
      console.log(filterdData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releasedate: newMovieDate,
        receivedOscar: isOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteMovie = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await deleteDoc(movie);
    } catch (error) {
      console.error(error);
    }
  };
  const updateTitle = async (id) => {
    try {
      const movie = doc(db, "movies", id);
      await updateDoc(movie, { title: updatedTitle });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder="release date..."
          onChange={(e) => setNewMovieDate(Number(e.target.value))}
        ></input>
        <div>
          <span>ReceiveOscar</span>
          <input
            type="checkbox"
            checked={isOscar}
            onChange={(e) => setIsOscar(e.target.checked)}
          ></input>
        </div>
        <button onClick={submitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList?.map((movie) => {
          return (
            <div>
              <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>
                {movie?.title}
              </h1>
              <h2>{movie?.releasedate}</h2>
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              <input
                type="text"
                placeholder="update title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              ></input>
              <button onClick={() => updateTitle(movie.id)}>Update</button>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        ></input>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
