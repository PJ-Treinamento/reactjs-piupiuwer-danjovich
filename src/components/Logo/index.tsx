import React from 'react';

import logoImage from '../../assets/images/piupiuwer.svg';

import { StyledLink } from './styles';

const Logo = () => {
    return (
        <StyledLink to="/" title="PiuPiuwer">
            <img src={logoImage} alt="PiuPiuwer" />
            <h1>PiuPiuwer</h1> 
        </StyledLink>
    )
}

export default Logo;