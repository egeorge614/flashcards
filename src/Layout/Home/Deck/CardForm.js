import React from "react";
import { Link } from "react-router-dom";

function CardForm({submitHandler, formData, changeHandler, deckId}) {

    return (
        <form onSubmit={submitHandler}>

            <div className="row col-4">
                <label htmlFor="front">front</label>
            </div>

            <div className="row col-4">
                <textarea id="front" name="front" className="form-control" value={formData.front} onChange={changeHandler} required /> 
            </div>

            <div className="row col-4">
                <label htmlFor="back">back</label>
            </div>

            <div className="row col-4">
                <textarea id="back" name="back" className="form-control" value={formData.back} onChange={changeHandler} required />
            </div>

                <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
    )



}

export default CardForm