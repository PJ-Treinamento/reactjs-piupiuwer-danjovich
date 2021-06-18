import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Logo from '../../components/Logo';

import { ErrorMessage, FrameDiv, PageDiv, StyledButton, StyledForm } from './styles';
import api from '../../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState(false);

    async function login(e: FormEvent) {
        e.preventDefault();

        await api.post('sessions/login', {
            email,
            password
        }).then((response) => {
            console.log(response.data);
            setLoginError(false);
        }).catch((error) => {
            setLoginError(true);
        });

    }

    return(
        <PageDiv>
            <FrameDiv>
                <Logo />
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
                        name="senha" 
                        placeholder="Senha" 
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    <StyledButton type="submit">Entrar</StyledButton>
                </StyledForm>
                <p id="cadastro">Ainda não tem um cadastro? <Link to="/">Crie uma nova conta.</Link></p>
            </FrameDiv>
        </PageDiv>
    )
}

export default Login;