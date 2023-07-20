/*********************************************************************************
* I confirm that this assignment is my own work in accordance with college Academic
Policy. No part of this assignment has been copied manually or electronically from any
other source (including web sites) or distributed to any person or website.
**
Name: Arzu Gizem Kirici Student ID: 135304210 Date: 04/13/2022
**
*******************************************************************************/


/* 
* Function accepts an array of values; and returns the array with its values in random order 
* Source: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
* Example usage:
* const studentGrades = [55, 93, 72]
* const randomizedGrades = shuffle(studentGrades)
*/


 
const shuffle = (array) => {    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

// array of question configs
let questions = [];
let currentQuestion = 0;
let score = 0;
for(let i = 0; i<3; i++){
    let number1 = Math.floor(Math.random() * 10) + 1;
    let number2 = Math.floor(Math.random() * 10) + 1;
    let list = [number1+number2 , number1+number2-1,number1+number2+1];
    questions[i]={title:`What is the ${number1}+${number2}`,choices:list,answer:number1+number2};
}


const updateScore = () => {
    document.querySelector("#curr-score").innerText = score;
}
// array of questions in random order
const quize = shuffle(questions);

const getElement = (id) => document.getElementById(id);

const questionsRemaining = () => {
    const questionsLeft = getElement("questions-remaining");
    questionsLeft.innerHTML = `${quize.length - currentQuestion}`;
}

const updateQuestion = () => {
    const question = getElement("question-text");
    question.innerHTML = quize[currentQuestion].title;
}

const updateChoices = () => {
    const choices = getElement("answer-choices");
    choices.innerHTML = "";
    // loop through choices and create buttons for each
    quize[currentQuestion].choices.forEach((choice) => {
        // create button element
        const button = document.createElement("button");
        button.innerHTML = choice;
        button.onclick = selectAnswer;
        choices.appendChild(button);
    });
}

const selectAnswer = (event) => {
    // element that was clicked
    const selectedChoice = event.target.innerText;
    
    // check if answer is correct
    if (selectedChoice == quize[currentQuestion].answer) {
        score += 100;
        console.log(`Question ${currentQuestion+1}: CORRECT!`);
        updateScore();
    }else{
        console.log(`Question ${currentQuestion+1}: WRONG! correct answer is: ${quize[currentQuestion].answer}`);
    }
    // increment to next question
    currentQuestion++;
    // if there are no more questions, end the game
    if (currentQuestion === quize.length) {
        gameOver();
    } else { // else, continue to next question
        updateQuestion();
        updateChoices();
        questionsRemaining();
    }
}

// end the quiz
const gameOver = () => {
    const choices = getElement("answer-choices");
    choices.innerHTML = "";
    const gameOverMessage = document.createElement("h2");
    gameOverMessage.innerHTML = `GAME OVER!`;
    choices.appendChild(gameOverMessage);
}

// start the quiz
const startQuiz = () => {
    updateQuestion();
    updateChoices();
    questionsRemaining();
    updateScore();
}

startQuiz();