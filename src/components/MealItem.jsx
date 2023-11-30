import { useContext } from "react"
import { formatting } from "../util/formatting"
import { Button } from "./UI/Button"
import CartContex from "../store/CardContext"

export const MealItem = ( { meal } ) => {

    const cartCtx = useContext(CartContex)

    const handleAddMealCart = () => {
        
        cartCtx.addItem(meal)
    
    }
  
    return (
        
        <li 
        
            className="meal-item"
            
        >

            <article>

                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>

                <div>

                    <h3>{meal.name}</h3>

                    <p className="meal-item-price">{formatting.format(meal.price)}</p>

                    <p className="meal-item-description">{meal.description}</p>

                </div>

                <p className="meal-items-actions">

                    <Button 

                        onClick={handleAddMealCart}

                    >
                        Add to card
                        
                    </Button>

                </p>

            </article>

        </li>

    )

}
