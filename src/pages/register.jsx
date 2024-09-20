import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';
import '../css/logreg.css';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/logo-small.png'; // Asegúrate de que la ruta sea correcta

const baseUrl = "http://localhost:3001/users";
const cookies = new Cookies();

class Register extends Component {
    state = {
        form: {
            username: '',
            apellido: '',
            email: '',
            password: '',
            verifyPassword: '',
            role: 'user',
        },
        error: '',
        success: false,
        redirect: null,
        acceptedTerms: false, // Estado para los términos
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleCheckboxChange = (e) => {
        this.setState({ acceptedTerms: e.target.checked });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { password, verifyPassword } = this.state.form;
        const { acceptedTerms } = this.state; // Acceder correctamente al estado

        if (!acceptedTerms) {
            this.setState({ error: 'Debes aceptar los términos y condiciones.' });
            return;
        }

        if (password.length < 8) {
            this.setState({ error: 'La contraseña debe tener al menos 8 caracteres.' });
            return;
        }

        if (password !== verifyPassword) {
            this.setState({ error: 'Las contraseñas no coinciden.' });
            return;
        }

        try {
            const response = await axios.get(baseUrl, { params: { username: this.state.form.username } });

            if (response.data.length > 0) {
                this.setState({ error: 'El nombre de usuario ya está en uso.' });
            } else {
                const newUser = {
                    username: this.state.form.username,
                    apellido: this.state.form.apellido,
                    email: this.state.form.email,
                    password: md5(this.state.form.password),
                    role: this.state.form.role,
                };

                await axios.post(baseUrl, newUser);
                this.setState({ success: true, redirect: '/login' }); // Redirigir a inicio de sesión
            }
        } catch (error) {
            console.log(error);
            this.setState({ error: 'Error al intentar registrar el usuario' });
        }
    };

    componentDidMount() {
        const role = cookies.get('role');
        if (role) {
            this.setState({
                redirect: role === 'admin' ? '/Adminmenu' : '/',
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        return (
            <div>
                <Navbar />
                <div className='n'>
                    <div className="form-container">
                        <img src={logo} alt="Logo" className="logo" />
                        <h2>Registro</h2>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <div className="input-group">
                                <label htmlFor="username">Nombres</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={this.state.form.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="apellido">Apellidos</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={this.state.form.apellido}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.form.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.form.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="verifyPassword">Verificar Contraseña</label>
                                <input
                                    type="password"
                                    id="verifyPassword"
                                    name="verifyPassword"
                                    value={this.state.form.verifyPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={this.state.acceptedTerms}
                                    onChange={this.handleCheckboxChange}
                                    required
                                />
                                <label htmlFor="terms">
                                    Acepto los <a href="/terms" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
                                </label>
                            </div>

                            {this.state.error && <p className="error">{this.state.error}</p>}
                            <button type="submit" className="btn">Registrarse</button>
                        </form>
                        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Register;
