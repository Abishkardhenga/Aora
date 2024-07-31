import { Alert } from "react-native";
import { GetCurrentUser } from "./appwrite";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const fetchPost = async () => {
        console.log("fucntion call bhayo hai ")
        setLoading(true);
        try {
            const user = await GetCurrentUser();
            console.log("this is user", user)
            if (user) {
                const response = await fn();
                setData(response);
                setLoading(true)
                console.log("this is response", response)
            } else {
                Alert.alert("Error", "User is not authenticated");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    useEffect(() => {

        fetchPost()
    }, [])
    const refetch = () => fetchPost()
    return { data, refetch }
}

export default useAppwrite; 