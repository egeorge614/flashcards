import React, { useEffect , useState} from "react";
import { readDeck } from "../../../utils/api";
import { useParams , Link , useHistory} from "react-router-dom";



function Study() {
    const history = useHistory()

    const initialValue = {
        name: "",
        description: "",
        cards: [{front: "", back: ""}]
    }

    const { deckId } = useParams();
    const [deck, setDeck] = useState(initialValue);
    const abortController = new AbortController();

    useEffect(() => {
        setDeck(initialValue);
            
        async function currentDeck(id) {
            try{
            const current = await readDeck(id, abortController.signal);
            setDeck({...current})
            
            } catch(error) {console.log(error)};
        };
    
        //getting and returning the deck fine but having issues setting state 
        
        currentDeck(deckId);
        
        return () => abortController.abort()
    
        }, [deckId]);

    const [cardIndex, setCardIndex] = useState(0);
    const [ frontOrBack, setFrontOrBack ] = useState(false);
        
       
    const { cards } = deck;
    
    let currentCard = cards[cardIndex];
    
    function nextHandler() {
        if ((cardIndex + 1) === cards.length) {
            window.confirm("Restart Cards?") ? history.go(0) : history.push("/");
        } else {
        setCardIndex((cardIndex)  => cardIndex + 1); 
        setFrontOrBack((current) => !current);}
    }


    if (cards.length <= 2) {

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item"><p>Study</p></li>
                    </ol>
                </nav>

                <h4>Not Enough cards.</h4>
                <p>You need at least 3 cards to study. There are {cards.length} in this deck</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            </div>
            
        )

    } else { 

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item"><p>Study</p></li>
                    </ol>
                </nav>
                <h2>{`Study: ${deck.name}`}</h2>
                <div className="card">
                    <div className="card-header">
                        <h3>{`Card ${cardIndex + 1} of ${cards.length}`}</h3>
                    </div>

                    <div className="card-body">
                    <div>{!frontOrBack ? <p>{currentCard.front}</p> : <p>{currentCard.back}</p>}</div>


                    <div className="row">
                        <button type="button" className="btn btn-primary" onClick={() => setFrontOrBack((current) => !current)}>Flip</button>
                        <div>{frontOrBack ? <button type="button" className="btn btn-secondary" onClick={nextHandler}>Next</button> : <p></p>}</div>
                    </div>
                    </div>

                </div>
            </div>
        )
}

}

export default Study