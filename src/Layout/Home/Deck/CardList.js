import React from "react";
import { Link , useRouteMatch } from "react-router-dom";



function CardList({ deck , deleteCardHandler }) {

    const { url } = useRouteMatch();

    
  
 
    const list = deck.cards.map(card => {
      return  ( <div className="card" key={card}>
            <div className="card-body" >
                <div className="row" style={{display: "flex", justifyContent: "space-evenly", fontSize: "20px"}}>
                    <div>{card.front}</div>
                    <div>{card.back}</div>
                </div>
                <div>
                    <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>Delete</button>
                </div>
            </div>
        </div>)
    });
 


    return (
        <div>
            {list}
        </div>
    )

}

export default CardList