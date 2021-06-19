import styled from "styled-components";

export const PiuLi = styled.li`
    border: 1px solid #6c8193;
    background: #fff;
    margin-top: -1px;

    .info {
        display: flex;
        align-items: center;
        margin: 16px 16px;
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

    .info img,
    aside .profile .square img {
        max-height: 100%;
    }

    p {
        margin: 8px 16px;
        overflow-wrap: break-word;
    }

    .interactions {
        display: flex;
        align-content: center;
        justify-content: space-around;
        margin: 16px 142px;
    }

    .interactions img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .interactions div {
        display: flex;
        align-content: center;
    }

    .interactions div img {
        margin-right: 4px;
    }
`