import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "../EditCard/CardForm";


function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    const initialFormState = {
        front: "",
        back: "",
    }
    const [formData, setFormData] = useState({...initialFormState});

    const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
    </svg>

    return (
        <div>
            <div className="d-flex bg-light rounded p-3">
                <p className="text-primary m-0 mr-2">{home}</p>
                <a href="/" className="text-primary m-0">Home</a>
                <p className="text-secondary m-0 ml-2 mr-2">/</p>
                <a href={`/decks/${deck.id}`} className="text-primary m-0">{deck.name}</a>
                <p className="text-secondary m-0 ml-2">/ Add Card</p>
            </div>
            <span className="d-flex">
                <h2 className="mb-3 mt-3 mr-2">{deck.name}: </h2>
                <h2 className="mb-3 mt-3">Add Card</h2>
            </span>
            <CardForm deckId={deckId} initialFormState={initialFormState} formData={formData} setFormData={setFormData}/>
        </div>
    )
}

export default AddCard;