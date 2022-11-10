import axios from 'axios';
export const addNewFood = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post("/api/food", data, config);
    return response;
}