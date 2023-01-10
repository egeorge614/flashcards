import React, { useEffect , useState} from "react";
import { readCard, readDeck , updateCard } from "../../../../utils/api";
import { useParams , Link , useHistory } from "react-router-dom";
import CardForm from "../CardForm";


function EditCard() {

    const initialCard = {
        front: "",
        back: "",
    }

    const initialDeck = {
        name: "",
        description: "",
        cards: []
    }


    const { cardId , deckId } = useParams();
    const [card, setCard] = useState(initialCard);
    const [deck, setDeck] = useState(initialDeck);
    const abortController = new AbortController();
    const [formData, setFormData] = useState({...initialCard});

    useEffect(() => {
        setDeck(initialDeck);
        setCard(initialCard);
            
        async function currentDeck(deckId, cardId) {
            try{
            const currentDeck = await readDeck(deckId, abortController.signal);
            const currentCard = await readCard(cardId, abortController.signal);
            setDeck({...currentDeck});
            setCard({...currentCard});
            setFormData({...currentCard});
            
            } catch(error) {console.log(error)};
        };
    
        //getting and returning the deck fine but having issues setting state 
        
        currentDeck(deckId, cardId);
        
        return () => abortController.abort()
    
        }, [deckId]);


    

    function changeHandler({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    
       }

       const history = useHistory();

       async function submitHandler(event) {
        
        event.preventDefault();
       
        const updatedCard = {...card, front: formData.front, back: formData.back}
       
        await updateCard(updatedCard, abortController.signal);
        history.go(0);

       }



       return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item"><p>{`Edit Card ${card.id}`}</p></li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <CardForm submitHandler={submitHandler} formData={formData} changeHandler={changeHandler} deckId={deckId} />

        </div>
       )



}

export default EditCard