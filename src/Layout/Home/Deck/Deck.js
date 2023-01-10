import React, { useEffect , useState} from "react";
import { readDeck , deleteDeck, deleteCard } from "../../../utils/api";
import { useParams , useRouteMatch , Link , useHistory} from "react-router-dom";
import CardList from "./CardList";



function Deck() {

    const initialValue = {
        name: "",
        description: "",
        cards: []
    }

    const { deckId } = useParams();
    const [deck, setDeck] = useState(initialValue);
    const abortController = new AbortController();
    const { path, url } = useRouteMatch();

    //useEffect here is grabbing the current deck using browser parameters so we can render the cards below using deck state

    

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

    }, [deckId])

    const history = useHistory();

    async function deleteDeckHandler(id, signal) {
        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
           try {
            
            await deleteDeck(id, signal);
            history.push("/")
          } catch (error) {console.log(error)}
          }
        }

    async function deleteCardHandler(id, signal) {
        if (window.confirm("Delete this card?\nYou will not be able to recover it.")) {
            try {
             
             await deleteCard(id, signal);
             history.go(0);
           } catch (error) {console.log(error)}
           }
         }
    
    

    //now HOPEFULLY we have grabbed the cards the readDecks function should be returning an object that looks like this 

    /* 
    {name: 'Note Taking', description: 'need to make sure the delete handler in useDecks rerenders the home page ', id: 1, cards: Array(0)}
    */

    //we will be using nested routes on this specific componenet

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item"><p>Create Deck</p></li>
                </ol>
            </nav>

            <div>
                <h4>{deck.name}</h4>
                <p>{deck.description}</p>
                <div>
                    <Link to={`${url}/edit`} className="btn btn-secondary">edit</Link>
                    <Link to={`${url}/study`} className="btn btn-primary">study</Link>
                    <Link to={`${url}/cards/new`} className="btn btn-primary">Add Cards</Link>
                    <button type="button" onClick={() => deleteDeckHandler(deckId, abortController.signal)} className="btn btn-danger">Delete icon goes here</button>
                </div>
            </div>

            <div>
                <h2>Cards</h2>
                <CardList deck={deck} deleteCardHandler={deleteCardHandler} />
            </div>
           
        </div>
    )

}

export default Deck