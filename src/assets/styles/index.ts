import { createGlobalStyle } from 'styled-components';

export const colors = {
	background: '#f3f3f3',
	frameStroke: '#6C8193',
	plainWhite: '#FFFFFF',
	gray: '#6C8193',
	transparentGray: '#6C819330',
	lightGray: '#b3b3b3',
	blue: '#0053A0',
	lightBlue: '#2471A3',
	link: '#0101E8',
	error: '#ff5733'
}

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		width: 100vw;
		height: 100vh;
		background: ${colors.background};
		font-family: 'Lato', sans-serif;
		text-rendering: optimizeLegibility !important;
		-webkit-font-smoothing: antialiased !important;

		display: flex;
		justify-content: center;
    	
		overflow-x: hidden;
	}

	a {
		text-decoration: none;
		color: unset;
	}

	input,
	button,
	textarea {
		outline: 0;
	}

	#root {
		width: 100vw;
	}
`