import React, { useState } from 'react';

const Questions = ({ questions, onAnswer }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State for the selected answer
    const [showResults, setShowResults] = useState(false); // New state to manage result visibility

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer); // Update the selected answer
    };

    const handleNextQuestion = () => {
        // Store the selected answer in userAnswers
        setUserAnswers([...userAnswers, selectedAnswer]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset the selected answer
        } else {
            // When all questions are finished, show the alert and then call onAnswer
            alert('You have completed all the questions.');
            setShowResults(true); // Show results
            onAnswer([...userAnswers, selectedAnswer]); // Pass all answers to the parent component
        }
    };

    if (showResults) {
        return null; // Do not show more questions
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="mt-4 mb-20">
            {questions.length > 0 ? (
                <div>
                    <h3>Question {currentQuestionIndex + 1}/{questions.length}</h3>
                    <h4>{currentQuestion.question}</h4>
                    <div className="list-group">
                        {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).map((answer, index) => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action ${selectedAnswer === answer ? 'bg-primary text-white' : ''}`} // CSS class to highlight the selected answer
                                onClick={() => handleAnswerSelect(answer)} // Call handleAnswerSelect instead of handleAnswer
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                        <button className="btn btn-secondary" onClick={handleNextQuestion}>
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                </div>
            ) : (
                <h4>No questions available</h4>
            )}
        </div>
    );
};

export default Questions;
