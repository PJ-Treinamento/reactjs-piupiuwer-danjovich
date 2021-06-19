import React, { useEffect, useState } from "react";

import Logo from "../../components/Logo";
import PiuTag, { Piu } from "../../components/Piu";

import feedImage from "../../assets/images/feed.svg";
import exitImage from "../../assets/images/sair.svg";
import filterImage from "../../assets/images/filtro.svg";
import like from '../../assets/images/like.svg';
import liked from '../../assets/images/liked.svg';

import { NewPiu, PageDiv, Pius, Sticky, StyledHeader, StyledSection } from "./styles";
import api from "../../services/api";

function Feed() {

    const [pius, setPius] = useState<Piu[]>([]);

    const token = localStorage.getItem('token');

    async function searchPius() {
        await api.get('pius', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const data = response.data;
            console.log(data);

            let piusArray: Piu[];
            piusArray = [];
            for (const piu of data) {
                piusArray.push(piu);
            }

            setPius(piusArray);
            
        }).catch((error) => {
            alert('Erro!');
            console.log(error);
        });
    }

    useEffect(() => {
        searchPius();
    }, []);

    // const []
    // let likes = document.getElementsByClassName('like');
    // for (let i = 0; i < likes.length; i++) {
    //     likes[i].addEventListener('click', function () {
    //         let numLikesSpan = likes[i].parentElement!.getElementsByTagName('span')[0]
    //         let numLikes = Number(numLikesSpan.innerHTML);
    //         if (String(likes[i].getAttribute('src')).includes(String(like))) {
    //             numLikesSpan.innerHTML = String(numLikes + 1);
    //             likes[i].setAttribute('src', String(liked));
    //         } else {
    //             numLikesSpan.innerHTML = String(numLikes - 1);
    //             likes[i].setAttribute('src', String(like));
    //         }
    //     });
    // }

    // const [liked, setLiked] = useState([]);

    return (
        <PageDiv>
            <StyledHeader>
                <Logo to="/feed" />
                <nav>
                    <ul>
                        <li><a href="/feed" title="Seu Feed"><img src={feedImage} alt="Feed" id="feed-icon" /> Seu Feed</a></li>
                        <li><a href="/" title="Sair"><img src={exitImage} alt="Sair" id="exit-icon" /> Sair</a></li>
                    </ul>
                </nav>
            </StyledHeader>

            <StyledSection>
                <Sticky>
                    <div className="searchbar">
                        <input type="text" placeholder="Buscar no PiuPiuwer" />
                        <img src={filterImage} alt="Filtrar" />
                    </div>

                    <form id="filter">
                        <h3>Buscar pius por:</h3>
                        <div>
                            <input type="radio" name="search-mode" value="users" defaultChecked />
                            <label htmlFor="users">Nome/username</label>
                        </div>
                        <div>
                            <input type="radio" name="search-mode" value="pius" />
                            <label htmlFor="pius">Conteúdo dos pius</label>
                        </div>
                    </form>
                </Sticky>

                <NewPiu>
                    <label htmlFor="new-piu-textarea" id="count">Caracteres: 0/140</label>
                    <textarea name="new-piu" id="new-piu-textarea" placeholder="Novo piu..."></textarea>
                    <div>
                        <input type="submit" id="publish" className="button" value="Publicar" disabled />
                    </div>
                </NewPiu>

                <Pius>
                    {pius.map((piu: Piu) => {
                        return <PiuTag piu={piu} currentUserPiu={false} />
                    })}
                </Pius>

            </StyledSection>
                    {/* Fazer Aside e terminar componente User */}

        </PageDiv>
    )
}

export default Feed;