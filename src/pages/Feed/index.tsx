import React, { FormEvent, useEffect, useState } from "react";

import Logo from "../../components/Logo";
import PiuTag, { Piu } from "../../components/Piu";
import UserTag, { User } from "../../components/User";

import feedImage from "../../assets/images/feed.svg";
import exitImage from "../../assets/images/sair.svg";
import filterImage from "../../assets/images/filtro.svg";

import { Aside, NewPiu, PageDiv, Pius, Sticky, StyledHeader, StyledSection } from "./styles";
import api from "../../services/api";

function Feed() {
    const [pius, setPius] = useState<Piu[]>([]);
    const [filteredPius, setFilteredPius] = useState<Piu[]>([]);
    const orderByDate = (piusArray: Piu[]) => {
        type Tuple = [Piu, Date];

        let sortable: Tuple[];
        sortable = [];
        for (const piu of piusArray) {
            sortable.push([piu, piu.created_at]);
        }
        sortable.sort(function (a, b) {
            return Number(a[1]) - Number(b[1]);
        });

        let result = [];
        for (const tuple of sortable) {
            result.push(tuple[0]);
        }
        return result;
    }

    const [currentUser, setCurrentUser] = useState<User>();
    const [currentUserFound, setCourrentUserFound] = useState(false);
    const [users, setUsers] = useState<User[]>();


    const token = localStorage.getItem('token');
    api.defaults.headers.authorization = `Bearer ${token}`;

    // Será usado para a publicação de novos pius
    const [newPiuPublished, setNewPiuPublished] = useState(false);
    useEffect(() => {
        async function getPius() {
            await api.get('pius').then((response) => {
                const data = response.data;
                // console.log(data);

                let piusArray: Piu[];
                piusArray = [];
                for (const piu of data) {
                    piusArray.push(piu);
                }

                piusArray = orderByDate(piusArray);
                // console.log(piusArray);
                setPius(piusArray);
                setFilteredPius(piusArray);
            }).catch((error) => {
                alert('Erro!');
                console.log(error);
            });
        }

        // async function getUser() {
        //     await api.get(`users?username=${username}`).then((response) => {
        //         // console.log(response.data);
        //         setCurrenteUser(response.data[0]);
        //         setCourrentUserFound(true);
        //     }).catch((error) => {
        //         alert('Erro!');
        //         console.log(error);
        //     });
        // }

        const username = localStorage.getItem('username');
        async function getUsers() {
            await api.get('users').then((response) => {
                let allUsers = response.data;
                console.log(allUsers);
                let localCurrentUser: User;
                for (const user of allUsers) {
                    if (user.username === username) {
                        setCurrentUser(user);
                        localCurrentUser = user;
                        setCourrentUserFound(true);
                        break;
                    }
                }
                allUsers = allUsers.filter((user: User) => {
                    return user.id !== localCurrentUser!.id;
                });
                setUsers(allUsers);
            }).catch((error) => {
                alert('Erro!');
                console.log(error);
            });
        }

        if (!newPiuPublished) {
            getUsers();
        }
        getPius();
        setNewPiuPublished(false);


    }, [newPiuPublished]);

    const [newPiu, setNewPiu] = useState('');
    const [publishingDisabled, setPublishingDisabled] = useState(true);
    const [lengthSize, setLengthSize] = useState('');
    const handleKeyPress = (content: string) => {
        setNewPiu(content);
        const currentLength = content.length;
        if (currentLength > 0 && currentLength < 140) {
            setPublishingDisabled(false);
            setLengthSize('');
        } else if (currentLength >= 140) {
            setPublishingDisabled(true);
            setLengthSize('too-big');
        } else if (currentLength === 0) {
            setPublishingDisabled(true);
            setLengthSize('too-short');
        }
    }

    // insertAt insere um ou mais elementos (elements) dentro de uma array 
    // na posição index:
    // const insertAt = (array: Array<any>, index: number, elements: any) => {
    //     let result = array;
    //     return result.splice(index, 0, elements);
    // }
    
    async function publishNewPiu(e: FormEvent) {
        e.preventDefault();

        if (newPiu.trim().length === 0) {
            alert('O piu não pode conter somente espaços');
            return;
        }

        await api.post('pius', {
            text: newPiu
        }).then((response) => {
            // console.log(response);
            setNewPiuPublished(true);
        }).catch((error) => {
            console.log(error);
            alert('Erro: não foi possível publicar o Piu');
        });
    }

    // Barra de pesquisa:
    const [viewFilter, setViewFilter] = useState(false);
    const changeFilterVisibilty = () => {
        setViewFilter(!viewFilter);
    }

    const [filterOption, setFilterOption] = useState('users');
    const [searchContent, setSearchContent] = useState('');

    const filterSearch = (newFilterOption: any) => {
        setFilterOption(newFilterOption.value);
        search(searchContent);
    }

    const search = (newSearchContent: string) => {
        const uppercase = newSearchContent.toUpperCase();
        setSearchContent(uppercase);
        let filteringPius = pius;
        if (filterOption === 'pius') {
            filteringPius = filteringPius.filter((piu: Piu) => {
                return piu.text.toUpperCase().indexOf(uppercase) > -1;
            });
        } else if (filterOption === 'users') {
            filteringPius = filteringPius.filter((piu: Piu) => {
                return (piu.user.first_name.toUpperCase().indexOf(uppercase) > -1
                    || piu.user.last_name.toUpperCase().indexOf(uppercase) > -1
                    || piu.user.username.toUpperCase().indexOf(uppercase) > -1);
            });
        }
        setFilteredPius(filteringPius);
    }

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
                        <input type="text" placeholder="Buscar no PiuPiuwer"
                               onChange={(e) => {
                                    e.preventDefault();
                                    search(e.target.value);
                                }} />
                        <img src={filterImage} onClick={changeFilterVisibilty} alt="Filtrar" />
                    </div>

                    {viewFilter &&
                    <form id="filter" onChange={(e) => filterSearch(e.target)}>
                        <h3>Buscar pius por:</h3>
                        <div>
                            <input type="radio" name="search-mode" value="users" defaultChecked />
                            <label htmlFor="users">Nome/username</label>
                        </div>
                        <div>
                            <input type="radio" name="search-mode" value="pius" />
                            <label htmlFor="pius">Conteúdo dos pius</label>
                        </div>
                    </form>}
                </Sticky>

                <NewPiu className={lengthSize} onSubmit={publishNewPiu}>
                        <label htmlFor="new-piu-textarea" id="count">Caracteres: {newPiu.length}/140</label>
                        <textarea name="new-piu" id="new-piu-textarea" placeholder="Novo piu..."
                                onChange={(e) => handleKeyPress(e.target.value)}></textarea>
                        <div>
                            <input type="submit" id="publish" className="button" value="Publicar" disabled={publishingDisabled} />
                        </div>
                </NewPiu>

                <Pius>
                    {filteredPius.map((piu: Piu) => {
                        let isFavoritePiu = false;
                        if (currentUserFound) {
                            // MUDAR PARA FAVORITAR LOCAL E EXPLICAR
                            console.log(currentUser!.favorites);
                            for (const favoritePiu of currentUser!.favorites) {
                                if (favoritePiu.id === piu.id)
                                    isFavoritePiu = true;
                            }
                        }
                        return <PiuTag piu={piu} favorite={isFavoritePiu} key={piu.id} />
                    })}
                </Pius>
            </StyledSection>
                    {/* Fazer Aside e terminar componente User */}
            <Aside>
                <h2>Seu Perfil</h2>
                {currentUserFound && <UserTag user={currentUser!} />}
                <h2>Outros Usuários</h2>
                {users?.map((user: User) => {
                    return <UserTag user={user} key={user.id} />
                })}
            </Aside>

        </PageDiv>
    )
}

export default Feed;