import styled from 'styled-components';
import { colors } from '../../assets/styles';

export const StyledInput = styled.input`
    min-width: 80%;
    font-size: 16px;
    background: ${colors.transparentGray};
    padding: 3% 2%;
    border: 1px solid ${colors.frameStroke};
    border-radius: 4px;

    ::placeholder {
        color: ${colors.lightGray};
    }

    :focus {
        outline: none;
    }
`