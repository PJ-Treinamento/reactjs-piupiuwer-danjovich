import React, { useEffect, useState } from "react";

import { User } from "../User";
import api from "../../services/api";

import like from "../../assets/images/like.svg";
import liked from "../../assets/images/liked.svg";
import favoriteSymbol from "../../assets/images/favoritado.svg";
import notFavoriteSymbol from "../../assets/images/favoritar.svg";
import deleteImage from "../../assets/images/deletar.svg";
import genericUserPhoto from "../../assets/images/perfil.svg";

import { PiuLi } from "./styles";

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
    piu: Piu,
    favorite: boolean
}

const PiuTag: React.FC<PiuTagProps> = ({piu, favorite}) => { 
    const username = localStorage.getItem('username');
    
    let currentUserPiu = false
    if (piu.user.username === username) currentUserPiu = true;

    const [numberOfLikes, setNumberOfLikes] = useState(piu.likes.length);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
    const [favoritePiu, setFavoritePiu] = useState(favorite);

    useEffect(() => {
        for (const like of piu.likes) {
            if (like.user.username === username)
                setLikedByCurrentUser(true);
        }
        setFavoritePiu(favorite);
    }, [piu, favorite, username]);

    const id = piu.id;
    const token = localStorage.getItem('token');
    api.defaults.headers.authorization = `Bearer ${token}`;
    async function likePiu() {
        await api.post('pius/like', {
            piu_id: id
        }).then((response) => {
            if (response.data.operation === 'like') {
                setNumberOfLikes(numberOfLikes + 1);
                setLikedByCurrentUser(true);
            }
            else if (response.data.operation === 'unlike') {
                setNumberOfLikes(numberOfLikes - 1);
                setLikedByCurrentUser(false);
            }
        }).catch((error) => {
            console.log(error);
            alert('Erro: não foi possível dar like');
        });
    }
    

    const formatedDate = (date: Date) => {
        let dif = Math.abs(Number(new Date()) - Number(date));
        let hoursAgo = Math.trunc(dif / 3.6E6);
        let minutesAgo = Math.trunc(dif / 6E4);
        if (minutesAgo < 60) {
            return 'Há ' + String(minutesAgo) + ' minuto(s)';
        } else if (hoursAgo < 24) {
            return 'Há ' + String(hoursAgo) + 'h';
        } else {
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
                ' às ' + date.getHours() + 'h' + ((date.getMinutes() >= 10) ? date.getMinutes() : '0' + date.getMinutes());
        }
    }

    const [deletedPiu, setDeletedPiu] = useState(false);
    async function deletePiu() {
        await api.delete('pius', {
            data: {piu_id: id}
        }).then(() => {
            setDeletedPiu(true);
        }).catch((error) => {
            console.log(error);
        });
    }


    async function favoriteThisPiu() {
        let favoriteOrUnfavorite = favoritePiu ? 'unfavorite' : 'favorite';

        await api.post(`pius/${favoriteOrUnfavorite}`, {
            piu_id: id
        }).catch((error) => {
            console.log(error);
        });

        setFavoritePiu(!favoritePiu);
    }

    return (
        <PiuLi deletedPiu={deletedPiu}>
            <div className="info">
                <div className="square">
                    <img src={piu.user.photo === '' ? genericUserPhoto : piu.user.photo} alt="Foto de Perfil" />
                </div>
                <div className="name-and-username">
                    <strong>{piu.user.first_name} {piu.user.last_name} <span>@{piu.user.username} · {formatedDate(new Date(String(piu.updated_at)))}</span></strong>
                </div>
            </div>
            <p>{piu.text}</p>
            <div className="interactions">
                <div>
                    <img src={likedByCurrentUser ? liked : like} onClick={likePiu} alt="Like" className="like" />
                    <span>{numberOfLikes}</span>
                </div>
                <img src={favoritePiu ? favoriteSymbol : notFavoriteSymbol} onClick={favoriteThisPiu} alt="Favoritar" />
                {currentUserPiu && <img src={deleteImage} onClick={deletePiu} alt="Deletar" className="delete" />}
            </div>
        </PiuLi>
    )
}

export default PiuTag;