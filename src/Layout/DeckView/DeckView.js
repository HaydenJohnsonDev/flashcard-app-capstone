import CardsMap from "./CardsMap";

import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function DeckView() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const pencil = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>);
    const add = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
  </svg>);
    const study = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmarks-fill" viewBox="0 0 16 16">
    <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
    <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
    </svg>);
    const trash = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg>);

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
            setCards([...deck.cards])
        }
        loadDeck();
    }, [deckId]);

    const deleteHandler = () => {
        if (window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(deckId)
            .then(() => history.push("/"));
        } else (history.push("/"));
    }

    const cardDeleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this card?")){
            deleteCard(id)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
    </svg>

    return (
        <span>
            <div className="d-flex bg-light rounded p-3">
                <p className="text-primary m-0 mr-2">{home}</p>
                <a href="/" className="text-primary m-0">Home</a>
                <p className="text-secondary m-0 ml-2">/ {deck.name}</p>
            </div>
            <div>
                <h2 className="mb-3 mt-3">{deck.name}</h2>
                <p className="deckName">{deck.description}</p>
                <span className="d-flex justify-content-between">
                    <span>
                        <Link to={`/decks/${deck.id}/edit`}><button type="button" className="mr-1 btn btn-secondary">{pencil} Edit</button></Link>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="m-1 btn btn-primary">{study} Study</button></Link>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="m-1 btn btn-primary">{add} Add Card</button></Link>
                    </span>
                    <button className="m-1 btn btn-danger" onClick={deleteHandler}>{trash}</button>
                </span>
            </div>
            <div className="mt-3">
                <h2>Cards</h2>
                <div className="border rounded mb-3">
                    <CardsMap cards={cards} cardDeleteHandler={cardDeleteHandler} deckId={deckId}/>
                </div>
            </div>
        </span>
    )
}

export default DeckView;