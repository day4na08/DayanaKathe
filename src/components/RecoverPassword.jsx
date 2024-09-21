import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/logreg.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const baseUrl = "http://localhost:3001/users"; // Asegúrate de que esta URL sea la correcta

class RecoverPassword extends Component {
    state = {
        email: '',
        message: '',
        error: ''
    }

    handleChange = (e) => {
        this.setState({ email: e.target.value, message: '', error: '' });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${baseUrl}/recover-password`, { email: this.state.email });
            this.setState({ message: 'Se ha enviado un enlace de recuperación a tu correo.', email: '' });
        } catch (error) {
            this.setState({ error: 'Error al enviar el enlace de recuperación.' });
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='n'>
                    <div className="form-container">
                        <h2>Recuperar Contraseña</h2>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div className="input-group">
                                <label htmlFor="email">Correo Electrónico:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            {this.state.message && <p className="success">{this.state.message}</p>}
                            {this.state.error && <p className="error">{this.state.error}</p>}
                            <button type="submit" className="btn">Enviar Enlace de Recuperación</button>
                        </form>
                        <p><Link to="/login">Regresar al inicio de sesión</Link></p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RecoverPassword;
