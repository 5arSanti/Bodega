import React from "react";
import { useNavigate } from "react-router-dom";

import { Title } from "../../components/Title";
import "./styles.css";
import { AppContext } from "../../../Context";
import { MessageCard } from "../../components/MessageCard";

const Login = () => {
    const context = React.useContext(AppContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
		context.setLoading(true);
        try {
            const response = await fetch( `${context.apiUri}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data = await response.json();

            if(response.status === 200) {
				context.messageHandler("all-ok", data.message)
				handleUserRol(data.type);

				navigate("/home");
				context.setIsLoged(true);
				context.setLoading(false);

            } else {
				context.messageHandler("error", data.message)
				context.setLoading(false);
			}
        }
        catch (err) {
			context.errorMessageHandler("error", err.message)
			context.setLoading(false);
        }
    };

	const handleUserRol = async (type) => {
		if (type == 1) {
			context.setAdmin(true)
		} else if (type == 0) {
			context.setAdmin(false);
		} else {
			context.setAdmin(false);
			context.errorMessageHandler("error", "Usuario invalido")
		}
	}

    return(
		<>
			<Title
				color="#FFF"
				borderColor="#FFF"
			>
				Bienvenido a  la Bodega de Archivos del SPE
			</Title>
			<div className="login-container">
				<Title
					color="#FFF"
					borderColor="#FFF"
				>
					Iniciar Sesión
				</Title>

				<form className="login-form-container" onSubmit={handleLogin}>
					<MessageCard/>
					<div className="form-input-container">
						<label htmlFor="login-email">Correo:</label>
						<input
							type="email"
							name="login-email"
							placeholder="Correo"
							value={email}
							onChange={(event) => {
								setEmail(event.target.value)
							}}
						/>
					</div>
					<div className="form-input-container">
						<label htmlFor="login-password">Contraseña:</label>
						<input
							type="password"
							name="login-password"
							placeholder="Contraseña"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value)
							}}
						/>
					</div>
					<button type="submit">Iniciar sesion</button>
				</form>
			</div>
		</>


    );
}

export { Login }