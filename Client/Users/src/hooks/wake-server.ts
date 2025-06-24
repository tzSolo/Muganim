import { useContext, useEffect } from "react"
import { apiContext } from "../contexts/api-context"

export const useWakeServer = () => {
    const { url } = useContext(apiContext);

    const wakeServerAsync = async () => {
        let response;
        do {
            response = await fetch(`${url}/api/Roles`);
        }
        while (!response.ok);
    }

    useEffect(() => {
        wakeServerAsync();
    }, []);

    return { wakeServerAsync }
}