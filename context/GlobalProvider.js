import { useContext, createContext, useState, useEffect } from "react"
import { GetCurrentUser } from "../lib/appwrite"



export const GlobalContext = createContext()


export const useGlobalContext = () => useContext(GlobalContext)



export const GlobalContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        GetCurrentUser().then((res) => {
            if (res) {

                setIsLoading(true)
                setUser(res)
            }
            else {
                setIsLoading(false)
                setIsLoggedIn(null)
            }
        }).catch((error) => {
            console.log(error)
            throw new Error(error)
        }).finally(() => {
            setIsLoading(false)

        })
    }, [])


    return (

        <GlobalContext.Provider value={{
            isLoggedIn, setUser, setIsLoggedIn, setIsLoading, user, isLoading
        }}>

            {{ children }}
        </GlobalContext.Provider>
    )
}