import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthProvider';
import styles from './LoginPage.module.css';
import WVIImage from "../../assets/VMB_Logo.png"

const LoginPage = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDisabled(true);
        try {
        await login(email, password);
        navigate('/dashboard');
        } catch (err) {
        setError(true);
        setDisabled(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={WVIImage} alt="Logo" />
            </div>
            <div className={styles.formContainer}>
                <h3 className={styles.title}>Ingresa a Document Data Center</h3>

                {error && (
                <div className={styles.errorBox}>
                    <span>Datos incorrectos o no registrado.</span>
                    <button className={styles.errorButton} onClick={() => setError(false)}>X</button>
                </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="email">Usuario</label>
                <input
                    id="email"
                    type="text"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className={styles.label} htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className={styles.button} disabled={disabled}>
                    Acceder
                </button>
                </form>

                <div className={styles.recovery}>Recuperar Contraseña</div>
            </div>
        </div>
    );
};

export default LoginPage;
