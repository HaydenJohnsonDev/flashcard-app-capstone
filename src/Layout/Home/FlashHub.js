import React from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import { useState, useEffect } from "react";
import DeckDesign from "./DeckDesign";

function FlashHub() {
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function loadDecks() {
            const decks = await listDecks();
            setDeck([...decks]);
        }
        loadDecks();
    }, []);    

    const deleteHandler = (idToDelete) => {
        if (window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(idToDelete)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    const deckSetup = deck.map((deck, index) => {
        return (
            <DeckDesign key={index} deck={deck} cards={deck.cards} deleteHandler={() => deleteHandler(deck.id)}/>
        );
    });

    if (deckSetup.length !== 0) return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-secondary mt-0 ml-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
</svg> Create Deck</button></Link>
            <span>{deckSetup}</span>
        </div>
    );
    return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-secondary ml-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
</svg> Create Deck</button></Link>
            <p>There are no decks! nothing to study. . .</p>
        </div>
    )
}

export default FlashHub;