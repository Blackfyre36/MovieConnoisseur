
import {createContext, useContext, useState, useEffect} from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Listen for login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchFavorites(firebaseUser.uid);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Get favorites from Firestore
  const fetchFavorites = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setFavorites(docSnap.data().favorites || []);
    } else {
      await setDoc(userRef, { favorites: [] });
    }
  };

  const cleanMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  release_date: movie.release_date,
  poster_path: movie.poster_path,
});

  // ✅ Add movie
  const addToFavorites = async (movie) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const cleaned = cleanMovie(movie);
  await updateDoc(userRef, {
    favorites: arrayUnion(cleaned),
  });
  setFavorites((prev) => [...prev, cleaned]);
};


  // ✅ Remove movie
  const removeFromFavorites = async (movieId) => {
  if (!user) return;
  const movie = favorites.find((m) => m.id === movieId);
  if (!movie) return;
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    favorites: arrayRemove(movie),
  });
  setFavorites((prev) => prev.filter((m) => m.id !== movieId));
};


  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <MovieContext.Provider
      value={{
        user,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        logout,
        loading
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};



