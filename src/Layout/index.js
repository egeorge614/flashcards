import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "./Home/CreateDeck/CreateDeck";
import Deck from "./Home/Deck/Deck";
import AddCard from "./Home/Deck/AddCard/AddCard";
import Study from "./Home/Study/Study";
import EditDeck from "./Home/Deck/EditDeck/EditDeck";
import EditCard from "./Home/Deck/EditCard/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/decks/new">
      <CreateDeck />
      </Route>

      <Route exact path="/decks/:deckId">
        <Deck />
      </Route>

      <Route path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>

      <Route path="/decks/:deckId/study">
        <Study />
      </Route>
      
      <Route path="/decks/:deckId/edit">
        <EditDeck />
      </Route>

      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>

      <Route>
        <NotFound />
      </Route>

      </Switch>
      </div>
    </div>
  );
}

export default Layout;
