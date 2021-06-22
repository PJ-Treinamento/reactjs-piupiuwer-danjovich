import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';

import { ErrorMessage, FrameDiv, NonSubmitStyledButton, PageDiv, StyledButton, StyledForm } from './styles';
import api from '../../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState(false);

    const history = useHistory();

    let savedEmail = localStorage.getItem('email');
    let savedPassword = localStorage.getItem('password');
    let state = (savedEmail && savedPassword) ? true : false;
    const [storedLoginData, setStoredLoginData] = useState(state);

    async function login(e: FormEvent) {
        e.preventDefault();

        await api.post('sessions/login', {
            email,
            password
        }).then((response) => {
            console.log(response.data);
            setLoginError(false);

            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            setStoredLoginData(true);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);

            history.push('/feed');
        }).catch((error) => {
            setLoginError(true);
            console.log(error);
        });

    }

    function fillFieldsWithStoredData() {
        setEmail(String(savedEmail));
        setPassword(String(savedPassword));
    }

    return(
        <PageDiv>
            <FrameDiv>
                <Logo to="/" />
                <p id="info">Entre no PiuPiuwer e veja o que seus amigos estão pensando.</p>
                {loginError && <ErrorMessage id="error">Email ou senha incorretos. Tente novamente.</ErrorMessage>}
                <StyledForm onSubmit={login}>
                    <Input 
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => {setEmail(e.target.value)}}
                    />
                    <Input 
                        type="password"
                        name="password" 
                        placeholder="Senha" 
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    {storedLoginData && <NonSubmitStyledButton type="button" onClick={fillFieldsWithStoredData}>
                        <u>Usar dados de login salvos</u>
                    </NonSubmitStyledButton>}
                    <StyledButton type="submit">Entrar</StyledButton>
                </StyledForm>
                <p id="cadastro">Ainda não tem um cadastro? <Link to="/">Crie uma nova conta.</Link></p>
            </FrameDiv>
        </PageDiv>
    )
}

export default Login;