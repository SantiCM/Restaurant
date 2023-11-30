import { useContext } from "react"
import {Modal} from "./UI/Modal"
import CartContex from "../store/CardContext"
import { formatting } from "../util/formatting"
import { Button } from "./UI/Button"
import userProgressContext from "../store/UserProggresContext"
import { CartItem } from "./CartItem"


export const Cart = () => {

    const cardCtx = useContext(CartContex)

    const userProgressCtx = useContext(userProgressContext)

    const cartTotal = cardCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0 )

    const handleCloseCart = () => {
    
        userProgressCtx.hideCart()
    
    } 

    const handleGoToCheckout = () => {
    
        userProgressCtx.showCheckout()
    
    } 
    
    return (
  
        <Modal 

            className= "cart"

            open={userProgressCtx.progress === 'cart'}

            onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
        
        >

            <h2>You Cart</h2>

            <ul>

                {cardCtx.items.map((item) => (
                
                    <CartItem 
                    
                        key={item.id} 
                        
                        name={item.name}
                        
                        quantity={item.quantity}

                        price={item.price}
                        
                        onIncrease={() => cardCtx.addItem(item) } 
                        
                        onDecrease={() => cardCtx.removeItem(item.id) }

                    >

                    </CartItem>
                
                ))}

            </ul>

            <p className="cart-total">{formatting.format(cartTotal)}</p>

            <p className="modal-actions">
                    
                <Button textOnly onClick={handleCloseCart}>Close</Button>

                {cardCtx.items.length > 0 && ( <Button onClick={handleGoToCheckout}>Checkout</Button> )}
                
            </p>

        </Modal>
  
    )

}