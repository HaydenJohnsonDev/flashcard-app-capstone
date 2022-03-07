import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
    const history = useHistory();
    const { deckId } = useParams();

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck})
            setFormData({
                id: `${deckId}`,
                name: `${deck.name}`,
                description: `${deck.description}`
            })
        }
        loadDeck();

    }, [deckId]);

    const [deck, setDeck] = useState({id: 0});
    const [formData, setFormData] = useState({})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    const cancelHandler = () => {
        history.go(-1);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(formData)
        .then(() => setFormData({
            id: `${deckId}`,
            name: `${deck.name}`,
            description: `${deck.description}`
        }))
        .then(() => history.go(-1));
    }

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
                <p className="text-secondary m-0 ml-2">/ Edit Deck</p>
            </div>
            <h2 className="mb-3 mt-3">Edit Deck</h2>
            <form onSubmit={submitHandler}>
                <p className="mt-2">Name</p>
                <input name="name" type="text" id="name" onChange={changeHandler} value={formData.name}/>
                <p className="mt-2">Description</p>
                <textarea name="description" type="textarea" id="name" onChange={changeHandler} value={formData.description}/>
                <div>
                    <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;