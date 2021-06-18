import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
    }

    h1 {
        font-family: 'Yeseva One', sans-serif;
        font-size: 40px;
        font-weight: 400;
        margin-left: 14px;
    }

`