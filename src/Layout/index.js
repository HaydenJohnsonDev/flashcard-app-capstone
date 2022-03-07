import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import FlashHub from "./Home/FlashHub";
import CreateDeck from "./CreateDeck/CreateDeck";
import DeckView from "./DeckView/DeckView";
import EditDeck from "./EditDeck/EditDeck";
import Study from "./Study/Study";
import AddCard from "./AddCard/AddCard";
import EditCard from "./EditCard/EditCard";
import { Switch, Route } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <FlashHub />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
