import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';

const CrearCuenta = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        numIdentificacionPa: '',
        email: '',
        numero: '',
        epsPa: '',
        password: '',
        confirmar: ''
    })
    const { nombrePa, numIdentificacionPa, email, numeroPa, epsPa, password, config } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("nombrePa").focus();
    }, [])

    const crearcuenta = async () => {
        const data = {
            nombrePa: usuario.nombrePa,
            apellidoPa: usuario.apellidoPa,
            numIdentificacionPa: usuario.numIdentificacionPa,
            email: usuario.email,
            epsPa: usuario.epsPa,
            numeroPa: usuario.numeroPa,

        }
        const response = await APIInvoke.invokePOST('/Usuarios', data);
        console.log(response);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        crearcuenta();
        alert('Cuenta creada exitosamente');
    }


    return (

        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="register-logo">
                    <Link to={"#"}><b>Crear Cuenta</b></Link>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">Crear tu nuevo usuario, ¡ahora!</p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    name="nombrePa"
                                    id="nombrePa"
                                    placeholder="Nombre completo"
                                    value={nombrePa}
                                    onChange={onChange} 
                                    />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numIdentificacionPa"
                                    id="numIdentificacionPa"
                                    placeholder="Numero de identificacion"
                                    value={numIdentificacionPa}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Correo electronico"
                                    value={email}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numeroPa"
                                    id="numeroPa"
                                    placeholder="Numero de telefono"
                                    value={numeroPa}
                                    onChange={onChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    name="epsPa"
                                    id="espPa"
                                    placeholder="Eps a la que esta afiliado"
                                    value={epsPa}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={onChange} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control"
                                    nombre="config"
                                    id="config"
                                    value={config}
                                    onChange={onChange}
                                    placeholder="Repita su contraseña" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center">

                                <button type="submit" to={"#"} className="btn btn-block btn-primary">

                                    Crear Cuenta
                                </button>
                                <Link to={"/"} className="btn btn-block btn-danger">

                                    Iniciar Sesion
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </div>);
}

export default CrearCuenta;