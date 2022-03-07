import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        async function loadCard() {
            const card = await readCard(cardId);
            setCard({...card});
            setFormData({
                deckId: parseFloat(deckId),
                id: `${cardId}`,
                front: `${card.front}`,
                back: `${card.back}`
            })
        }
        loadCard();
    }, [deckId, cardId]);
    
    const initialFormState = {
        deckId: parseFloat(deckId),
        id: `${cardId}`,
    }
    const [formData, setFormData] = useState({});
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

    const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
    </svg>

    return (
        <div>
            <div className="d-flex bg-light rounded p-3">
                <p className="text-primary m-0 mr-2">{home}</p>
                <a href="/" className="text-primary m-0">Home</a>
                <p className="text-secondary m-0 ml-2 mr-2">/</p>
                <a href={`/decks/${deck.id}`} className="text-primary m-0">Deck {deck.name}</a>
                <p className="text-secondary m-0 ml-2">/ Edit Card {cardId}</p>
            </div>
            <h2 className="mb-3 mt-3">Edit Card</h2>
            <CardForm deckId={deckId} cardId={cardId} card={card} initialFormState={initialFormState} formData={formData} setFormData={setFormData}/>
        </div>
    )
}

export default EditCard;