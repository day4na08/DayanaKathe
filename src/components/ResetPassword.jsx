import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/logreg.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const baseUrl = "http://localhost:3001/users"; // Asegúrate de que esta URL sea la correcta

const ResetPassword = () => {
    const { token } = useParams(); // Obtener el token de la URL
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${baseUrl}/reset-password`, { token, password });
            setMessage('Contraseña restablecida exitosamente. Puedes iniciar sesión.');
            setPassword('');
        } catch (error) {
            setError('Error al restablecer la contraseña.');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='n'>
                <div className="form-container">
                    <h2>Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="password">Nueva Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {message && <p className="success">{message}</p>}
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="btn">Restablecer Contraseña</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResetPassword;
