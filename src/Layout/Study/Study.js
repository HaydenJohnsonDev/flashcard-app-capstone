import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

import StudyCardMap from "./StudyCardMap";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState(0);
    

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setCards([...deck.cards]);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    const [side, setSide] = useState(true);
    const totalCards = cards.length
    
    const flipHandler = () => {
        if (side === true){
            setSide(false)
        } else {setSide(true)}
    }

    const nextHandler = () => {
        if (card + 1 === cards.length) {
            if (window.confirm("Restart Cards? Click 'cancel' to return to the home page")) {
                setCard(0);
            } else {
                history.push('/');
            }
        } else {setCard(card + 1)} 
        setSide(true);
    }

    const add = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
  </svg>);
  const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>

    if (deck.id) {
        if (totalCards < 3) {
            return (
                <>
                    <div className="d-flex bg-light rounded p-3">
                        <p className="text-primary m-0 mr-2">{home}</p>
                        <a href="/" className="text-primary m-0">Home</a>
                        <p className="text-secondary m-0 ml-2 mr-2">/</p>
                        <a href={`/decks/${deck.id}`} className="text-primary m-0">{deck.name}</a>
                        <p className="text-secondary m-0 ml-2">/  Study</p>
                    </div>
                    <div>
                        <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                        <h3>Not enough cards.</h3>
                        <p>You need at least 3 cards to study. there are {totalCards} in this deck.</p>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="m-1 btn btn-primary">{add} Add Cards</button></Link>
                    </div>
                </>
            )
        }
        return (
            <div>
                <div className="d-flex bg-light rounded p-3">
                    <p className="text-primary m-0 mr-2">{home}</p>
                    <a href="/" className="text-primary m-0">Home</a>
                    <p className="text-secondary m-0 ml-2 mr-2">/</p>
                    <a href={`/decks/${deck.id}`} className="text-primary m-0">{deck.name}</a>
                    <p className="text-secondary m-0 ml-2">/  Study</p>
                </div>
                <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                <div className="border rounded p-3">
                    <h3>Card {card + 1} of {totalCards}</h3>
                    <StudyCardMap cards={cards} card={card} side={side} flipHandler={flipHandler} nextHandler={nextHandler}/>
                </div>
            </div>
        )
    }
    return (<p>Loading Deck...</p>)
}

export default Study;