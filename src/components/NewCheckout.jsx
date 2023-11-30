import { useContext } from "react"
import { Modal } from "./UI/Modal"
import CartContex from "../store/CardContext"
import { formatting } from "../util/formatting"
import { Input } from "./Input"
import { Button } from "./UI/Button"
import userProgressContext from "../store/UserProggresContext"
import { useHttp } from "../hooks/useHttp"
import { Error } from "./Error"

const requestConfig = {

    method: "POST",

    headers: {
                
        "Content-Type" : "application/jsonn"
            
    },
}

export const NewCheckout = () => {

    const cartCtx = useContext(CartContex)

    const userPorgressCtx = useContext(userProgressContext)

    const {data, isLoanding: isSending, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", requestConfig)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0 )
    
    const handleClose = () => {
    
        userPorgressCtx.hideCheckout()
    
    }

    const handleFinish = () => {
         
        userPorgressCtx.hideCheckout()

        cartCtx.clearCart()

        clearData()
    
    }

    const handleSubmit = (event) => {
    
        event.preventDefault()

        const fd = new FormData(event.target)

        const customerData = Object.fromEntries(fd.entries()) // {email: ......}

        sendRequest(JSON.stringify({
        
            order: {
            
                items: cartCtx.items,

                customer: customerData
            
            }
        
        }))
    
    }

    let actions = (
        
        <>
        
            <Button onClick={handleClose} type="button" textOnly>Close</Button>

            <Button>Sumbit Order</Button>
        
        </>    
        
    )

    if(isSending) {
    
        actions = <p>Seding order data ...... </p>
    
    }
    
    if(data && !error) {
    
        return <Modal 
            
            open={userPorgressCtx.progress === "checkout"}

            onClose={handleFinish}

        >

            <h2>Success!</h2>

            <p>You order was submitted successfully.</p>

            <p>We wiil get bacj to you with more details via email within the next few minutes</p>

            <p className="modal-actions">

                <Button onClick={handleFinish}>OKAY</Button>


            </p>

        </Modal>

    }

    return (
  
        <Modal open={userPorgressCtx.progress === "checkout"} onClose={handleClose}>

            <form onSubmit={handleSubmit}>

                <h2>Checkout</h2>

                <p>Total Amount: {formatting.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"></Input>

                <Input label="Email Adress" type="email" id="email"></Input>

                <Input label="Street" type="text" id="street"></Input>

                <div className="control-row">

                    <Input label="Postal Code" type="text" id="postal-code"></Input>

                    <Input label="City" type="text" id="city"></Input>

                </div>

                {
                
                    error && <Error title="Failed to submit order" message={error}></Error>
                
                }

                <p className="modal-actions">

                    {actions}

                </p>

            </form>

        </Modal>
  
    )

}
