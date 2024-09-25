import React, { useState } from 'react';
import { fetchTriviaQuestions, saveSearchHistory } from '../services/apiService';

const Form = ({ onSubmit, onStartQuiz }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState('easy');
    const [type, setType] = useState('multiple');
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(true); // State to control the visibility of the form

    const validateForm = () => {
        const errors = {};
        if (!fullName) errors.fullName = "Full name is required.";
        if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Email is required and must be valid.";
        if (!questionCount || questionCount < 1 || questionCount > 50) errors.questionCount = "Question count must be an integer between 1 and 50.";
        if (!difficulty) errors.difficulty = "Selecting difficulty is required.";
        if (!type) errors.type = "Selecting type is required.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        setErrors({});

        const searchData = {
            full_name: fullName,
            email: email,
            question_count: questionCount,
            difficulty: difficulty,
            type: type,
        };

        try {
            // Fetch trivia questions
            const response = await fetchTriviaQuestions(questionCount, difficulty, type);
            
            // Filter questions and sort by category
            const filteredQuestions = response
                .filter(q => q.category !== "Entertainment: Video Games") // Filter category
                .sort((a, b) => a.category.localeCompare(b.category)); // Sort by category

            // Save history in the backend
            await saveSearchHistory(searchData);

            // Change visibility of the form
            setIsVisible(false); // Hide form

            // Call the function to pass the questions to App
            onSubmit(filteredQuestions);

            // Smooth scroll to the Questions component
            onStartQuiz(); // New function to handle scrolling
            resetForm();
        } catch (error) {
            console.error("Error fetching trivia questions:", error);
        }
    };

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setQuestionCount(10);
        setDifficulty('easy');
        setType('multiple');
    };

    return (
        <>
            {isVisible && ( // Render the form only if isVisible is true
                <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
                    <h3 className="mb-4">Trivia Form</h3>
                    <div className="mb-3">
                        <label className="form-label">Full Name:</label>
                        <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number of Questions:</label>
                        <input type="number" className="form-control" value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} />
                        {errors.questionCount && <p className="text-danger">{errors.questionCount}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Difficulty:</label>
                        <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        {errors.difficulty && <p className="text-danger">{errors.difficulty}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Type:</label>
                        <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True/False</option>
                        </select>
                        {errors.type && <p className="text-danger">{errors.type}</p>}
                    </div>
                    <div className="d-flex justify-content-end mt-5">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            )}
        </>
    );
};

export default Form;
