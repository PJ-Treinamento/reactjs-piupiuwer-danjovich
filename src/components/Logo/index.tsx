import React from 'react';

import logoImage from '../../assets/images/piupiuwer.svg';

import { StyledLink } from './styles';

interface LogoProps {
    to: string
}

const Logo: React.FC<LogoProps> = ({to}) => {
    return (
        <StyledLink to={to} title="PiuPiuwer" id="logo">
            <img src={logoImage} alt="PiuPiuwer" />
            <h1>PiuPiuwer</h1> 
        </StyledLink>
    )
}

export default Logo;