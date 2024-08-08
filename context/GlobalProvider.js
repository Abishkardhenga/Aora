import { useContext, createContext, useState, useEffect } from "react"
import { GetCurrentUser } from "../lib/appwrite"



export const GlobalContext = createContext()


export const useGlobalContext = () => useContext(GlobalContext)



export const GlobalContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [editingData, setEditingData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)



    useEffect(() => {
        setIsLoading(true);
        GetCurrentUser().then((res) => {
            if (res) {
                setUser(res);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }).catch((error) => {
            console.log(error);
            setIsLoggedIn(false)
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (

        <GlobalContext.Provider value={{
            isLoggedIn, setUser, setIsLoggedIn, setIsLoading, user, isLoading, editingData, setEditingData, editMode, setEditMode
        }}>

            {children}
        </GlobalContext.Provider>
    )
}