import React from "react";
import CardsView from "./CardsView";

function CardsMap({ cards, cardDeleteHandler, deckId}) {
    return cards.map((card, index) => {
        return <CardsView index={index} card={card} cardDeleteHandler={() => cardDeleteHandler(card.id)} deckId={deckId}/>
    })
}

export default CardsMap;