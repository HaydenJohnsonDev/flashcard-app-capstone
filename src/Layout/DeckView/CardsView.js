import React from "react";
import { Link } from "react-router-dom";

function CardsView({index, card, cardDeleteHandler, deckId}) {
    const pencil = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>);
    const trash = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg>);
    if (index === 0) {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-around">
                    <p className="m-3 flex-grow">{card.front}</p>
                    <p className="m-3 flex-grow">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                        <button type="button" className="mr-2 mb-3 btn btn-secondary">{pencil} Edit</button>
                    </Link>
                    <button className="mr-3 mb-3 btn btn-danger" onClick={cardDeleteHandler}>{trash}</button>
                </div>
            </div>
        )
    }
    return (
        <div className="d-flex flex-column border-top">
            <div className="d-flex justify-content-around">
                <p className="m-3 flex-grow">{card.front}</p>
                <p className="m-3 flex-grow">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button type="button" className="mr-2 mb-3 btn btn-secondary">{pencil} Edit</button>
                </Link>
                <button className="mr-3 mb-3 btn btn-danger" onClick={cardDeleteHandler}>{trash}</button>
            </div>
        </div>
    )
}

export default CardsView;