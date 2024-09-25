import { useState, useRef } from 'react';
import Form from './components/Form';
import Questions from './components/Questions';
import Result from './components/Result';

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const questionsRef = useRef(null); // Reference for the Questions component

    const handleSearch = (fetchedQuestions) => {
        setQuestions(fetchedQuestions);
        setUserAnswers([]); // Reset answers
    };

    const handleAnswers = (answers) => {
        setUserAnswers(answers);
    };

    const handleRestart = () => {
        setQuestions([]); // Reset questions
        setUserAnswers([]); // Reset answers
    };

    const handleStartQuiz = () => {
        // Smooth scroll to the Questions component
        questionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="my-4">Trivia App</h1>
            <div className="w-50">
                <Form onSubmit={handleSearch} onStartQuiz={handleStartQuiz} /> {/* Add onStartQuiz here */}
            </div>
            {questions.length > 0 && (
                <div className="mt-4 w-50" ref={questionsRef}> {/* Add ref here */}
                    <Questions questions={questions} onAnswer={handleAnswers} />
                </div>
            )}
            {userAnswers.length > 0 && questions.length > 0 && (
                <div className="mt-4 w-50">
                    <Result userAnswers={userAnswers} questions={questions} onRestart={handleRestart} /> {/* Pass onRestart */}
                </div>
            )}
        </div>
    );
};

export default App;
