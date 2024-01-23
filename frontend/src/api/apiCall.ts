import axios from "axios"

const callAPIOnButtonClick = async (type: string, url: string, parameters?: object, headers?: object) => {
    try {
        if (type == "GET") {
            const response = await axios.get(url, { headers });
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        } else if (type == "POST") {
            const response = await axios.post(url, parameters, { headers });
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        } else if (type == "PUT") {
            const response = await axios.put(url, parameters, { headers });
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        } else {
            const response = await axios.delete(url, parameters);
            const data = await response.data;
            return { statusFromBackend: response.status, dataFromBackend: data };
        }
    } catch (error) {
        console.log("Error in calling the api : " + error)
    }
}

export default callAPIOnButtonClick;