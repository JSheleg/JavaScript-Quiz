//Initialize questions
var questions = [
    { 
        quest: 'Inside which HTML element do we put the JavaScript?',
        multipleChoice: [
            '<scripting>',
            '<javascript>',
            '<script>',
            '<js>'
        ],
        answer: '<script>'
    },


    {
        quest:'What is the correct JavaScript syntax to change the content of the HTML element? <p id = "demo"> This is a demonstration.</p>',
        multipleChoice: [
            'document.getElementByName("p").innerHTML = "Hello World!";',
            'document.getElement("p").innerHTML = "Hello World!";',
            'document.getElementById("demo").innerHTML = "Hello World!";',
            '#demo.innerHTML = "Hello World!";'
        ],
        answer: 'document.getElementById("demo").innerHTML = "Hello World!";'
    } ,   


    {
        quest:'How do you write "Hello World" in an alert box?',
        multipleChoice: [
            'alert("Hello World");',
            'alertBox("Hello World");',
            'msgBox("Hello World");',
            'msg("Hello World");'
        ],
        answer: 'alert("Hello World");'
    },

    {
        quest:"How do you write an IF statement in JavaScript?",
        multipleChoice: [
            'if i = 5',
            'if i = 5 then',
            'if i == 5 then',
            'if(i == 5)'
        ],
        answer: 'if(i == 5)'

    },


    {
        quest:"How does a FOR loop start?",
        multipleChoice: [
            'for(i = 0, i <= 5)',
            'for i = 1 to 5',
            'for(i <= 5; i++)',
            'for(i = 0, i <= 5; i++)'
        ],
        answer: 'for(i = 0, i <= 5; i++)'
    }
];

//Initialized variables
var timer = document.getElementById('countdown');
var start = document.querySelector("#startGame");
var quest = document.getElementById('prompt');
var scoreEl = document.getElementById('count');
var finalScore = document.getElementById('final');
var buttonA = document.getElementById('A');
var buttonB = document.getElementById('B');
var buttonC = document.getElementById('C');
var buttonD = document.getElementById('D');
var highScoreBtn = document.getElementById('seeHighScores');
var highScoreSpan = document.getElementById('highscore');
var intialsSpan = document.getElementById('hsinitials');
var submitButton = document.querySelector('#submitInitials');
var qCounter = -1;
var finalAnswer;
var userScore = 0;
var score = 0;
var selectedChoice;
var timeLeft = 100;
var timeBonus = 0;

highScoreBtn.addEventListener('click', function(event){
    event.preventDefault();

    alert(' you requested to see the current highscore');
    returnHighScore();
    showHighScore();
})

// Function to start counter with 100s on the clock to beat the test
function countdown(){

    var timeInterval = setInterval(function(){
        if(timeLeft > 1){
            timer.textContent = timeLeft + " seconds remaining";
            timeLeft --;
        }
        else if(timeLeft === 1){
            timer.textContent = timeLeft + " second remaining";
            timeLeft --;
        }
        else{
            timer.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);
}

// function to establish buttons and add event-listeners to listen for the selectedChoice
var establishButtons = function(){
    quest.innerText =questions[qCounter].quest;
    buttonA.innerText =questions[qCounter].multipleChoice[0];
    buttonB.innerText =questions[qCounter].multipleChoice[1];
    buttonC.innerText =questions[qCounter].multipleChoice[2];
    buttonD.innerText =questions[qCounter].multipleChoice[3];

    finalAnswer= questions[qCounter].answer
    console.log("final answer = " + finalAnswer);
}

//adds event listener to each of the multiple choice buttons, looks for the button choice.
document.querySelectorAll('#multiple-choice-wrapper').forEach(item =>{
    item.addEventListener('click',event =>{
        alert('button clicked')
        console.log(event.target);
        selectedChoice = document.getElementById(event.target.id).innerText;
        console.log(selectedChoice);
        solutions();
    })
})


var solutions = function(){
    //compares final answer to the user's selectedChoice
    if(finalAnswer === selectedChoice){
        console.log(finalAnswer + "final answer")
        console.log(selectedChoice)
        alert("correct")
        score ++;
        scoreEl.textContent = score;
        console.log(qCounter)

        //check to see if question is not the last question, if it is, calculate final score
        if(qCounter === questions.length-1){
            alert("end of questions, game is over");
            timeBonus = timeLeft;
            console.log(timeLeft);
            score = score + timeBonus
            userScore = score;
            finalScore.textContent = "Final Score: " + score;
            console.log("final score is " + userScore);
            saveHighScore();    
            timeLeft = 0; 
        }
        // increase counter and move onto next question
        else{
            qCounter ++
            console.log(qCounter + " Question");
        
            establishButtons();
        }
       
    }
    //selectedChoice is wrong
    else{
        alert("incorrect answer")
        console.log(finalAnswer + "final answer")
        console.log(selectedChoice)
        //check to see if score is already zero
        if(score === 0){
            alert("You lost the game")
            timeLeft = 0;
        }
        //incorrect answer, but score is not zero
        else{
            score --;
            scoreEl.textContent = score;
            timeLeft = timeLeft - 10;
            //check to see if question is the last question, if it is, game ends
            if(qCounter === questions.length-1){
                alert("Game has ended");
                timeBonus = timeLeft;
                score = score+timeBonus;
                userScore = score;
                finalScore.textContent = "Final Score: " + userScore;
                saveHighScore();
                timeLeft = 0;
            }
            //incorrect answer, but you have time to redeem yourself with the next question
            else{
            }
            qCounter ++;
            console.log(qCounter + " Question");
            establishButtons();
        }
        
        
        
    }

}


//save highscore and initials
var saveHighScore = function(){ 
    // retrieves highscore if available 
    var highscore = localStorage.getItem("highscore");
    console.log(highscore);

    //if highscore is available, enter loop
    if(highscore !== null){
        if(userScore > highscore){
            alert("You got the new high score, please insert your intials and submit"); 
            submitButton.addEventListener('click', function(event){
                var initials = document.getElementById('initials').value;
                localStorage.setItem("highscore",userScore);
                localStorage.setItem('initials',initials);
            });
        }
        else {
            alert("you did not get the high score. Please try again");  
        }
     
    }   //save new highscore to local storage
    else {
        alert("You have the new highscore, please insert your initials and submit");
        submitButton.addEventListener('click', function(event){
            var initials = document.getElementById('initials').value;
            localStorage.setItem("highscore",userScore);
            localStorage.setItem('initials',initials);
        });
    }

}

//pulls items from localStorage
var returnHighScore = function(){
    highscore =localStorage.getItem('highscore');
    console.log(highscore);
    var initials = localStorage.getItem('initials');
    console.log(initials);
    highScoreSpan.textContent = highscore;
    intialsSpan.textContent = initials;
    

}

//start game with the click of the start button
start.addEventListener("click",function(){
    countdown();
    alert("start button has been clicked");
    document.getElementById("welcome").style.display = "none";
    document.getElementById("startGame").style.display = "none";    
    qCounter ++;
    ShowAndHide();
    establishButtons();
});

//hide elements after the start button is clicked
function ShowAndHide() {
    var x = document.getElementById('multiple-choice-wrapper');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }

    var y = document.getElementById('countdown');
    if (y.style.display == 'none') {
        y.style.display = 'block';
    } else {
        y.style.display = 'none';
    }

    var z = document.getElementById('prompt');
    if (z.style.display == 'none') {
        z.style.display = 'block';
    } else {
        z.style.display = 'none';
    }
  
}

//shows highscore when highscore button is pressed. 
var showHighScore = function(){
    var hi = document.getElementById('card');
    if (hi.style.display == 'none') {
        hi.style.display = 'block';
    } else {
        hi.style.display = 'none';
    }
}