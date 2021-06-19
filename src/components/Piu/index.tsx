import React from "react";

import { User } from "../User";

import like from "../../assets/images/like.svg";
import pin from "../../assets/images/destacar.svg";
import deleteImage from "../../assets/images/deletar.svg";

import { PiuLi } from "./styles";
import Like from "../Like";

export interface PiuLike {
    id: string,
    user: User,
    piu: Piu
}

export interface Piu {
    id: string,
    user: User,
    likes: PiuLike[],
    text: string,
    created_at: Date,
    updated_at: Date
}

interface PiuTagProps {
    piu: Piu
    currentUserPiu?: boolean
}

const PiuTag: React.FC<PiuTagProps> = ({piu, currentUserPiu}) => {
    const numberOfLikes = piu.likes.length;

    const formatedDate = (date: Date) => {
        let dif = Math.abs(Number(new Date()) - Number(date));
        let hoursAgo = Math.trunc(dif / 3.6E6);
        if (hoursAgo < 24) {
            return 'Há ' + String(hoursAgo) + 'h';
        } else {
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
                ' às ' + date.getHours() + 'h' + date.getMinutes();
        }
    }

    return (
        <PiuLi>
            <div className="info">
                <div className="square">
                    <img src={piu.user.photo} alt="Foto de Perfil" />
                </div>
                <div className="name-and-username">
                    <strong>{piu.user.first_name} {piu.user.last_name} <span>@{piu.user.username} · {formatedDate(new Date(String(piu.updated_at)))}</span></strong>
                </div>
            </div>
            <p>{piu.text}</p>
            <div className="interactions">
                <div>
                    {/* <img src={like} alt="Like" className="like" /> */}
                    <Like />
                    <span>{numberOfLikes}</span>
                </div>
                <img src={pin} alt="Destacar" className="highlight" />
                {currentUserPiu && <img src={deleteImage} alt="Deletar" className="delete" />}
            </div>
        </PiuLi>
    )
}

export default PiuTag;