import React from "react";
import { Link , Route , useHistory} from "react-router-dom";
import { useState } from "react";
import { createDeck } from "../../../utils/api";
import DeckForm from "../Deck/DeckForm";



function CreateDeck() {

  const abortController = new AbortController();

   const initialState = {
    name: "",
    description: "",
   };

   const [formData, setFormData] = useState({...initialState});
   const history = useHistory()

   function changeHandler({ target }) {
    setFormData({
        ...formData,
        [target.name]: target.value,
    })

   }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(formData, abortController.signal);
    history.push("/");
   }


   /* Breadcrumb example

   <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">Home</li>
  </ol>
</nav>

*/
   

   return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">      
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>  
                <li className="breadcrumb-item active">Create Deck</li>          
             </ol>
        </nav>
        <h2>Create Deck</h2>
        <DeckForm handleSubmit={handleSubmit} formData={formData} changeHandler={changeHandler} />
    </div>
   )






}

export default CreateDeck
