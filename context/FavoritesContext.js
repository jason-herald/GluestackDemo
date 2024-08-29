import React, { createContext, useContext, useState } from 'react';


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);


  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const alreadyFavorited = prevFavorites.some((fav) => fav.id === product.id);
      if (!alreadyFavorited) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

 
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== productId)
    );
  };


  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => useContext(FavoritesContext);
