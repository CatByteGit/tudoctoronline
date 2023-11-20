import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const RegistroPaciente = () => {
  const [Pacientes, setPacientes] = useState({
    Nombre_Apellido: '',
    TipoDocumento: '',
    Identificacion: '',
    FechaNaciPaci: '',
    Telefono: '',
    clave: '',
    confirmar: ''
  })
  const { Nombre_Apellido, TipoDocumento, Identificacion, FechaNaciPaci, Telefono, clave, confirmar } = Pacientes;

  const onChange = (e) => {
    setPacientes({
      ...Pacientes,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById("Nombre_Apellido").focus();
  }, [])

  const registrarPacientes = async () => {
    const verificarExistenciaUsuario = async (Identificacion) => {
      try {
        const response = await APIInvoke.invokeGET(
          `/Pacientes?Identificacion=${Identificacion}`
        );
        if (response && response.length > 0) {
          return true; // El usuario ya existe
        } else {
          return false; // El usuario no existe
        }

      } catch (error) {
        console.error(error);
        return false; // Maneja el error si la solicitud falla 
      }
    };

    if (clave !== confirmar) {
      const msg = "Las contraseñas no coinciden.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else if (clave.length < 6) {
      const msg = "Contraseña demasiado corta (debe ser mayor a 6 caracteres)";
      swal({
        title: 'Error',
        text: msg,
        icon: 'warning',
        buttons: {
          confirmar: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {
      const usuarioExistente = await verificarExistenciaUsuario(Identificacion);
      const data = {
        Nombre_Apellido: Pacientes.Nombre_Apellido,
        TipoDocumento: Pacientes.TipoDocumento,
        Identificacion: Pacientes.Identificacion,
        FechaNaciPaci: Pacientes.FechaNaciPaci,
        Telefono: Pacientes.Telefono,
        clave: Pacientes.clave,
      }
      const response = await APIInvoke.invokePOST(`/Pacientes`, data);
      const mensaje = response.msg;

      if (usuarioExistente) {
        const msg = "El usuario ya existe.";
        swal({
          title: 'Error',
          text: msg,
          icon: 'info',
          buttons: {
            confirmar: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const msg = "El usuario fue creado correctamente.";
        swal({
          title: 'Bienvenido',
          text: msg,
          icon: 'success',
          buttons: {
            confirmar: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-primary',
              closeModal: true
            }
          }
        });

        setPacientes({
          Nombre_Apellido: '',
          TipoDocumento: '',
          Identificacion: '',
          FechaNaciPaci: '',
          Telefono: '',
          clave: '',
        })
      }
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    registrarPacientes();
  }

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Registro de pacientes</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  id="Nombre_Apellido"
                  name="Nombre_Apellido"
                  value={Nombre_Apellido}
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-signature" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <select className="form-control"
                  name="TipoDocumento"
                  value={TipoDocumento}
                  onChange={onChange}
                >
                  <option value="">Seleccione un tipo de documento</option>
                  <option value="CedulaCiudadania">Cédula de Ciudadania</option>
                  <option value="TarjetaIdentidad">Tarjeta de Identidad</option>
                  <option value="RegistroCivil">Registro Civil</option>
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-regular fa-address-card" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="identificacion"
                  id="Identificacion"
                  name="Identificacion"
                  value={Identificacion}
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-address-card" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Fecha Nacimiento"
                  id="FechaNaciPaci"
                  name="FechaNaciPaci"
                  value={FechaNaciPaci}
                  onChange={onChange}
                />


              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Telefono"
                  id="Telefono"
                  name="Telefono"
                  value={Telefono}
                  onChange={onChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-mobile-retro" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="clave"
                  name="clave"
                  value={clave}
                  onChange={onChange}

                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="confirmar"
                  id="confirmar"
                  value={confirmar}
                  onChange={onChange}
                  placeholder="Repita su contraseña"

                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="terms"
                      defaultValue="agree"
                    />
                  </div>
                </div>
              </div>
              <div className="social-auth-links text-center">
                <button type="submit" className="btn btn-block btn-primary">
                  Crear cuenta
                </button>
                <Link to={"/"} className="btn btn-block btn-danger">
                  Ya tengo cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPaciente;