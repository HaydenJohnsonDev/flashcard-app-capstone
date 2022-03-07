import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";

function CreateDeck() {
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        createDeck(formData)
        .then(() => setFormData({...initialFormState}))
        .then(() => history.push("/"));
        
    }
    const cancelHandler = () => {
        setFormData({...initialFormState});
        history.push("/")
    }

    const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
</svg>
    
    return (
        <>
            <div className="d-flex bg-light rounded p-3">
                <p className="text-primary m-0 mr-2">{home}</p>
                <a href="/" className="text-primary m-0">Home</a>
                <p className="text-secondary m-0 ml-2">/  Create Deck</p>
            </div>
            <h2 className="mt-3 mb-3">Create Deck</h2>
            <form onSubmit={submitHandler}>
                <p className="mt-2">Deck Name</p>
                <input name="name" type="text" id="name" placeholder="Deck Name" onChange={changeHandler} value={formData.name}/>
                <p className="mt-2">Description</p>
                <textarea name="description" type="textarea" id="name" placeholder="Brief descritpion of the deck" onChange={changeHandler} value={formData.description}/>
                <div>
                    <button type="button" className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
            </form>
        </> 
    )
}

export default CreateDeck;