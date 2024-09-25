import React from 'react';

const Result = ({ userAnswers, questions }) => { 
    // Count correct and incorrect answers
    const correctAnswersCount = userAnswers.filter((answer, index) => 
        answer === questions[index].correct_answer
    ).length;
    
    const incorrectAnswersCount = questions.length - correctAnswersCount;

    const handleRestart = () => {
        window.location.reload(); // Reload the page
    };

    return (
        <div className="mt-4">
            <h2>Results</h2>
            <h4>You have answered {userAnswers.length} questions out of {questions.length}</h4>
            <h4>Correct answers: {correctAnswersCount}</h4> {/* Show correct answers */}
            <h4>Incorrect answers: {incorrectAnswersCount}</h4> {/* Show incorrect answers */}
            <ul className="list-group">
                {questions.map((question, index) => {
                    const userAnswer = userAnswers[index];
                    const correctAnswer = question.correct_answer;

                    return (
                        <li key={index} className="list-group-item">
                            <h5>{`Question ${index + 1}: ${question.question}`}</h5>
                            <div className="list-group">
                                {question.incorrect_answers.concat(correctAnswer).map((answer, i) => {
                                    let answerClass = 'list-group-item list-group-item-action';
                                    
                                    // Determine the CSS class for the background
                                    if (answer === correctAnswer) {
                                        answerClass += ' bg-success text-white'; // Correct answer
                                    } else if (userAnswer === answer) {
                                        answerClass += ' bg-danger text-white'; // Incorrect answer
                                    }

                                    return (
                                        <div key={i} className={answerClass}>
                                            {answer}
                                        </div>
                                    );
                                })}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="d-flex justify-content-end mt-5 mb-200" style={{ marginBottom: '200px' }}>
                <button onClick={handleRestart} className="btn btn-primary mt-3">Restart</button> {/* Button to reload */}
            </div>
        </div>
    );
};

export default Result;
