import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserCartFavorites() {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/1/cart'); 
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchFavoriteItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/1/favorites'); 
        setFavoriteItems(response.data);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };

    fetchCartItems();
    fetchFavoriteItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/users/1/cart/${productId}`); 
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/users/1/favorites/${productId}`); 
      setFavoriteItems(favoriteItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from favorites:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.nombre}
            <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Productos Favoritos</h2>
      <ul>
        {favoriteItems.map(item => (
          <li key={item.id}>
            {item.nombre}
            <button onClick={() => handleRemoveFromFavorites(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCartFavorites;
