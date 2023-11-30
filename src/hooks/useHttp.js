import { useCallback, useEffect, useState } from "react"

const sendHttpRequest = async(url, config) => {

    const response = await fetch(url,config)

    const resData = await response.json()

    if(!response.ok) {
    
        throw new Error(resData.message || "Something went wrong, failed to send request")
    
    }

    return resData

}

export const useHttp = (url, config, initialData) => {

    const [error, setError] = useState()

    const [isLoanding, setIsLoanding] = useState(false)

    const [data, setData] = useState(initialData)

    const clearData = () => {
    
        setData(initialData)
    
    }

    const sendRequest = useCallback(async function sendRequest (data)  {

        setIsLoanding(true)

        try {

            const resData = await sendHttpRequest(url, {...config, body: data})

            setData(resData)
            
        } catch (error) {

            setError(error.message || "Something went wrong")
            
        }

        setIsLoanding(false)
    
    }, [url, config])  

    useEffect(() => {

        if((config && (config.method === "GET" || !config.method)) || !config) {
        
            sendRequest()
        
        }

    }, [sendRequest, config])
    
    return {
    
        data,

        isLoanding,

        error,

        sendRequest,

        clearData
        
    }
  
}