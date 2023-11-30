import { createContext, useReducer } from "react"

const CartContex = createContext({
    
    items: [],

    addItem: (item) => {},

    removeItem: (id) => {},

    clearCart: () => {},

})

const cartReducer = (state, action) => {

    if(action.type === "ADD_ITEM") {
    
        // ...update de state
        // Nunca se debe de mutar el estado de manera inicial, porque push editara el array de los items existentes, almacenando en memoria
        //state.items.push(action.item)

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const updateItems = [...state.items]
 
        // damos el menos 1, porque el findIndex si encuentra el array dara un -1
        if(existingCartItemIndex > - 1) {

            const existingItem = state.items[existingCartItemIndex]
        
            const updateItem = {

                ...existingItem,

                quantity: existingItem.quantity + 1

            } 

            updateItems[existingCartItemIndex] = updateItem
        
        } else {
        
            updateItems.push({...action.item, quantity: 1})
        
        }

        return {
        
            ...state,

            items: updateItems
        
        }
    
    }

    if(action.type === "REMOVE_ITEM") {
    
        // ...remover el state

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex]

        const updateItems = [...state.items]

        if(existingCartItem.quantity === 1) {
        
            // toma un indice el del cart del index,
            // el numero de articulos que debe aplicarse el metodo splice, osea eliminados
            updateItems.splice(existingCartItemIndex, 1)
        
        } else {
        
            const updateItem = {
                
                ...existingCartItem, 
                
                quantity: existingCartItem.quantity - 1
            
            }

            updateItems[existingCartItemIndex] = updateItem
        
        }

        return {
        
            ...state,

            items: updateItems
        
        }
    
    }

    if(action.type === "CLEAR_CART") {
    
        return {...state, items: []}
    
    }

    return state

}

export const CardContextProvider = ({children}) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] })

    const addItem = (item) =>   {
        
        dispatchCartAction({type: "ADD_ITEM", item})

    }

    const removeItem = (id) =>   {

        dispatchCartAction({type: "REMOVE_ITEM", id})
        
    }

    const clearCart = () =>   {

        dispatchCartAction({type: "CLEAR_CART"})
        
    }

    const cartContext = {
    
        items : cartState.items,

        addItem,

        removeItem,

        clearCart
    
    }

    return (
    
        <CartContex.Provider 
    
            value={cartContext} 
        
        >
            {children}
        
        </CartContex.Provider>

    )
    
}

export default CartContex