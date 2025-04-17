import axios from 'axios';

const API = axios.create({
    baseURL: 'https://ccl-mini-project-backend.onrender.com'
});

export const executeCode = async (code, language) => {
    try {
        const response = await API.post('/execute', { code, language });
        return response.data;
    } catch (error) {
        throw error;
    }
};
