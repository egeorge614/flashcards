import React from "react";
import { useParams , Link , useHistory} from "react-router-dom";
import { useEffect , useState } from "react";
import { readDeck , createCard } from "../../../../utils/api";
import CardForm from "../CardForm";


function AddCard() {
    
    const abortController = new AbortController();

    const initialValue = {
        name: "",
        description: ""
    }

    const [deck, setDeck] = useState(initialValue);
    const { deckId } = useParams();

    useEffect(() => {
        setDeck(initialValue);
            
        async function currentDeck(id) {
            try{
            const current = await readDeck(id, abortController.signal);
            setDeck({...current})
            
            } catch(error) {console.log(error)};
        };
    
        
        
        currentDeck(deckId);
        
        return () => abortController.abort()
    
        }, [deckId])

    //we have the deck stored in deck variable 

    const initialState = {
        front: "",
        back: "",
       };
    
       const [formData, setFormData] = useState({...initialState});
       const history = useHistory()
    
       function changeHandler({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    
       }

       async function submitHandler(event) {
        event.preventDefault(); 
        await createCard(deckId, formData, abortController.signal)
        history.push("/");
       }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item"><p>Add card</p></li>
                </ol>
            </nav>
            <h2>{`Add Card`}</h2>
            <CardForm submitHandler={submitHandler} formData={formData} changeHandler={changeHandler} deckId={deckId} />
        </div>
    )




}

export default AddCard
