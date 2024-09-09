import React from 'react';
import './login.css'; // Asegúrate de importar el archivo CSS

const LoginForm = () => {
  return (
    <div className="login-form">
      <h1 className="login-form__title">
        Inicio y creación de usuario
      </h1>
      <div className="login-form__input-group">
        <label className="login-form__label">
          <input
            placeholder="Usuario"
            className="login-form__input login-form__input--username"
          />
        </label>
      </div>
      <div className="login-form__input-group">
        <label className="login-form__label">
          <input
            placeholder="Contraseña"
            type="password"
            className="login-form__input login-form__input--password"
          />
        </label>
      </div>
      <button className="login-form__button">
        Log in
      </button>
      <p className="login-form__footer">
        En caso de duda o problema contactar con Mantis Manager.
      </p>
    </div>
  );
};

export default LoginForm;
