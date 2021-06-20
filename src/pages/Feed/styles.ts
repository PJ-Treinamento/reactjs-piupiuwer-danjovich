import styled from "styled-components";
import { colors } from "../../assets/styles";
import searchImage from "../../assets/images/buscar.svg";

export const PageDiv = styled.div`
    width: 80vw;
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */

    button,
	input.button {
		text-align: center;
		padding: 4px 16px;
		height: fit-content;
		font-weight: bold;
		font-size: 14px;
		background: #2471A3;
		color: #fff;
		border: 0;
		border-radius: 16px;
		cursor: pointer;

		width: 130px;
	}

    .name-and-username span {
        font-weight: normal;
        color: #b3b3b3;
    }

    .info .square,
    aside .square {
        display: flex;
        justify-content: center;
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8px;
    }

    @media(max-width: 1200px) {
        h1 {
            display: none
        }
    }

`

export const StyledHeader = styled.header`
    position: fixed;
    width: 20vw;
    margin-left: 2%;
    margin-top: 1%;
    height: 8%;
    display: block;

    nav {
        display: flex;
        flex-direction: column;
        margin-left: 3.4%;
        margin-top: 8%;
        padding: 0;
    }

    nav ul {
        list-style: none;
    }

    nav ul li {
        font-size: 24px;
        padding: 0.8% 0.2%;
        margin-top: 5%;
        margin-left: 7.5%;
    }

    nav ul li:first-child {
        margin-top: 5%;
    }

    nav ul li a {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-style: italic;
        color: #3f3f3f;
    }

    nav ul li a:hover {
        color: #2471A3;
    }

    nav ul li a img {
        width: 40px;
        height: 40px;
        margin-right: 4%;
    }   
`

export const NewPiu = styled.form`
    label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #6c8193;
    }

    textarea {
        padding: 16px;
        resize: none;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        border-radius: 8px;
        background: #E8ECEF;
    }

    div {
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }

    /* .too-big label {
        color: #ff5733;
        font-weight: 900;
    }

    .too-big textarea {
        background: #FAAF9F;
    }

    .too-big input,
    .too-short input {
        background: #b3b3b3;
        cursor: default;
    }

    input[type="submit"]:disabled {
        background: ${colors.lightGray};
        cursor: default;
    } */
`

export const StyledSection = styled.section`
    width: 38vw;
    margin: 1.5% 0 1.5% 29%;
    box-shadow: 0 0 4px rgba(0, 0, 0, .25);
    height: min-content;

    form {
        background: #fff;
        display: flex;
        flex-direction: column;
        height: fit-content;
        border: 1px solid #6c8193;
        padding: 16px;
        margin-top: -1px;
    }

    ${NewPiu}.too-big label {
        color: #ff5733;
        font-weight: 900;
    }

    ${NewPiu}.too-big textarea {
        background: #FAAF9F;
    }

    ${NewPiu}.too-big input,
    ${NewPiu}.too-short input {
        background: #b3b3b3;
        cursor: default;
    }

    ${NewPiu} input[type="submit"]:disabled {
        background: ${colors.lightGray};
        cursor: default;
    }
`

export const Sticky = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    .searchbar {
        display: flex;
        align-items: center;
        background: #E8ECEF;
        padding: 24px 32px;
        border: 1px solid #6c8193;
    }

    .searchbar input {
        width: 98%;
        height: 36px;
        border: 1px solid #6c8193;
        padding: 0 30px 0 41px;
        border-radius: 16px;
        color: #b3b3b3;
        font-size: 16px;
        background: #fff url(${searchImage}) no-repeat 8px center;
        background-size: 25px;

        margin-right: 16px;
    }

    .searchbar input::placeholder {
        color: #b3b3b3;
    }

    .searchbar img {
        width: 36px;
        height: 36px;
        cursor: pointer;
    }

    form#filter {
        /* display: none; */
        flex-direction: row;
        background: #E8ECEF;
        color: #3f3f3f;
    }

    form#filter div {
        display: flex;
        align-items: center;
        margin-left: 16px;
    }

    form#filter div label {
        margin-left: 4px;
    }
`

export const Pius = styled.ul`
    list-style: none;
`

export const Aside = styled.aside`
    aside {
        margin: 40px 32px 0 24px;
    }

    aside h2 {
        font-size: 20px;
        margin-bottom: 16px;
    }

    aside .profile {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

    }

    aside .profile .square {
        width: 58px;
        height: 58px;
    }

    aside .profile .info {
        display: flex;
        flex-direction: column;
    }

    aside .profile .info button {
        margin-top: 8px;
    }

`