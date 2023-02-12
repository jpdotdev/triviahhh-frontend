import React from 'react'
import shuffle from "../shuffle.js"
import Stats from "./Stats"
import "../App.css"


export default function Quiz() {

       // set all initial states for questions, answers, and buttons
    const [quizList, setQuizList] = React.useState([]);
    const [correctAnswer, setCorrectAnswer] = React.useState("");
    const [score, setScore] = React.useState(0);
    const [questionNum, setQuestionNum] = React.useState(1)
    const [activePage, setActivePage] = React.useState("Quiz")
    const [hidden, setHidden] = React.useState("")
    const [correct, setCorrect] = React.useState('hidden')
    const [displayCorrect, setDisplayCorrect] = React.useState('hidden')
    const [displayNext, setDisplayNext] = React.useState('hidden')
    const [displayEnd, setDisplayEnd] = React.useState('hidden')
    const [displayStart, setDisplayStart] = React.useState('displayStart')
    const [disabled, setDisabled] = React.useState("")
 
    // fetches question from the Open Trivia Database API and sets the array to quizlist state
    function getQuiz() {
        fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        .then(response => {
            return response.json();
        })
        .then((data) => {
            setQuizList(data.results) 
            setCorrectAnswer(data.results[0].correct_answer)
            setDisplayNext('displayNext')
            setDisplayEnd('displayEnd')
            setDisplayStart('hidden')
         })
    }

    // combine all of the answers and shuffle them
        let allAnswers;

        quizList.forEach((triviaItem, index) => {

        const {correct_answer, incorrect_answers} = triviaItem;

        allAnswers = shuffle([correct_answer, ...incorrect_answers])  

        })

    // decodes characters to plain HTML
    function remove(result) {
        return result.replace(/(&quot;)/g, "\"").replace(/(&rsquo;)/g, "\"").replace(/(&#039;)/g, "'").replace(/(&amp;)/g, "\"")
        .replace(/(&eacute;)/g).replace(/(&ldquo;)/g,'"').replace(/(&rdquo;)/g,'"').replace(/(&Aacute;)/g,'Á')
        .replace(/(&oacute;)/g,'ó').replace(/(&Oacute;)/g,'Ó').replace(/(&aacute;)/g,'á').replace(/(&aring;)/g,'å').replace(/(&ouml;)/g,'ö')
        .replace(/(&auml;)/g,'ä').replace(/(&Auml;)/g,'Ä').replace(/(&Ouml;)/g,'Ö').replace(/\u00AD/g, '');
    }

    // function to verify if the button click is the correct answer or not, then loads next quiz question
    function verifyCorrectAnswer(answerSelected) {
        if(answerSelected === correctAnswer) {
            setScore(score + 1);
            setCorrect('correct')
            setDisabled('disabled')
        } else if (answerSelected !== correctAnswer){
            setScore(score)
            setDisplayCorrect('displayCorrect')
            setDisabled('disabled')
        }
    }

    function nextQuestion() {
        setDisplayCorrect('hidden')
        setCorrect('hidden')
        getQuiz()
        setQuestionNum(questionNum + 1)
        setDisabled("")
    }

    function endGame() {
        setActivePage("Stats")
        setHidden("hidden")
        setDisplayCorrect('hidden')
        setCorrect('hidden')
        setDisplayNext('hidden')
        setDisplayEnd('hidden')
    }

    return (
        <div className="quizPage">
        <button onClick={getQuiz} className="getQButton" id={displayStart}> Start Quiz! </button>
            <div id={hidden}>
                {quizList.map((item, index) => (
                    <>
                        <h3 className="questionNumber" id={hidden}>Question Number: {questionNum}</h3>
                        <h4 className="category"> Category: {remove(item.category)} </h4> <br/>
                        <h1 key={index} className="question"> {remove(item.question)}</h1>         
                    </>
                ))}      
            </div> 
            <div className="answerBlock" id={hidden}>
                {allAnswers?.map((answer,index) => (
                    <button disabled={disabled} key={index}
                    className="answer"
                    onClick={() => verifyCorrectAnswer(answer)}>
                    {remove(answer)}
                    </button>
                ))}
            </div>
            <p id={displayCorrect}> Sorry, the correct answer is: <b>{remove(correctAnswer)}</b> </p>
            <p id={correct}> Correct! </p>
            <h3 className="score" id={hidden}>Score: {score}</h3>
            <button onClick={nextQuestion} id={displayNext}> Next Question</button>
            <button onClick={endGame} id={displayEnd}> End Quiz</button>
            <div>
                {activePage === "Stats" && <Stats score={score} questionNum={questionNum} />}           
            </div>
        </div>
    ) 
   
}

