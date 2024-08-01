import { Alert } from "react-native";
import { GetCurrentUser } from "./appwrite";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)

    const fetchPost = async () => {
        setLoading(true);
        try {
            const user = await GetCurrentUser();
            if (user) {
                const response = await fn();
                setData(response);
                setLoading(true)
            } else {
                Alert.alert("Error", "User is not authenticated");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchPost()
    }, [])
    const refetch = () => fetchPost()
    return { data, refetch }
}

export default useAppwrite; 