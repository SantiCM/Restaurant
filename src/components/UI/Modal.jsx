import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export const Modal = ( { cildren, open, className = "", onClose } ) => {

    const dialog = useRef()

    useEffect(() => {

        const modal = dialog.current
      
        if(open) {
        
            modal.showModal()
        
        }

        return () => modal.close()

    }, [open])
    
    return createPortal (
  
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>

            {cildren}

        </dialog>,

        document.getElementById("modal")
  
    )

}