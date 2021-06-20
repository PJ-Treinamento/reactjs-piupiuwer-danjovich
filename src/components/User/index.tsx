import React from "react";

import { Piu, PiuLike } from "../Piu";
import { Profile } from "./styles";


export interface User {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    about: string,
    photo: string,
    pius: Piu[],
    likes: PiuLike[],
    following: User[],
    followers: User[],
    favorites: Piu[]
}

interface UserTagProps {
    user: User
}

const UserTag: React.FC<UserTagProps> = ({user}) => {
    return(
        <Profile>
            <div className="square">
                <img src={user.photo} alt="Foto de Perfil" id="current-user-img" />
            </div>
            <div className="info">
                <div className="name-and-username" id="current-user-info">
                    <strong>{user!.first_name} {user!.last_name} <span>@{user!.username}</span></strong>
                </div>
            </div>
        </Profile>
    )
}

export default UserTag;