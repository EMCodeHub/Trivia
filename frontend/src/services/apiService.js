import axios from 'axios';

// Get the base URL of the API from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL;
const TRIVIA_API_URL = import.meta.env.VITE_TRIVIA_API_URL;

// Function to get the CSRF token from Sanctum (this replaces the use of the meta tag)
// Not used

const getCsrfToken = async () => {
    await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
};

// Function to decode HTML entities
const decodeHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

// Function to fetch trivia questions (does not require the CSRF token)
export const fetchTriviaQuestions = async (amount, difficulty, type) => {
    try {
        const response = await axios.get(`${TRIVIA_API_URL}?amount=${amount}&difficulty=${difficulty}&type=${type}`);
        
        // Decode questions and answers
        const formattedQuestions = response.data.results.map(question => ({
            ...question,
            question: decodeHTML(question.question), // Decode question
            correct_answer: decodeHTML(question.correct_answer), // Decode correct answer
            incorrect_answers: question.incorrect_answers.map(decodeHTML) // Decode incorrect answers
        }));

        return formattedQuestions; // Return already decoded questions
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        throw error;
    }
};

// Function to save search history in Laravel (requires CSRF token)
export const saveSearchHistory = async (data) => {
    try {
        // Get the CSRF token before making the POST request
        await getCsrfToken();
        const response = await axios.post(`${API_BASE_URL}/api/search-history`, data);
        return response.data;
    } catch (error) {
        console.error('Error saving search history:', error);
        throw error;
    }
};

// Function to get search history (requires CSRF token)
export const getSearchHistory = async () => {
    try {
        // Get the CSRF token before making the GET request
        await getCsrfToken();
        const response = await axios.get(`${API_BASE_URL}/api/search-history`);
        return response.data;
    } catch (error) {
        console.error('Error fetching search history:', error);
        throw error;
    }
};
