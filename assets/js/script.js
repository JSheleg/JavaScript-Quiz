//Initialize questions
var questions = [
    { 
        prompt: 'Inside which HTML element do we put the JavaScript',
        multipleChoice: [
            '<scripting>',
            '<javascript>',
            '<script>',
            '<js>'
        ],
        answer: '<script>'
    },


    
    {
        prompt:'What is the correct JavaScript syntax to change the content of the HTML element <p id = "demo"> This is a demonstration.</p>',
        multipleChoice: [
            'document.getElementByName("p").innerHTML = "Hello World!";',
            'document.getElement("p").innerHTML = "Hello World!";',
            'document.getElementById("demo").innerHTML = "Hello World!";',
            '#demo.innerHTML = "Hello World!";'
        ],
        answer: 'document.getElementById("demo").innerHTML = "Hello World!";'
    }    
];

//Initialized variables

var timer = document.getElementById('countdown');
var start = document.querySelector("#startGame");
var buttonChoices =document.querySelectorAll("#id");
var scoreEl = document.getElementById('count')
var qCounter = -1;
var finalAnswer;
var selectedChoice;
var score = 0;
var chosenbtn;
var selectedChoice;
var m;
var timeLeft = 100;



// Function to start counter with 100s on the clock to beat the test

var countdown = function(){
    //var timeLeft = 100;

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

    //create div with class button-wrapper + qcounter and question div and header
    var questionPrompt = document.createElement('h2');
    questionPrompt.setAttribute("style", 'text-align:center;')
    
    
    document.body.appendChild(questionPrompt);

    var quizContainer = document.createElement('div');
    quizContainer.setAttribute("class", "button-wrapper "+ qCounter);
    quizContainer.setAttribute("style", 'text-align:center;')
    console.log("qCounter: " + qCounter); 

    for(var i = 0; i< questions[qCounter].multipleChoice.length; i++){
        //create button and set id to i counter
        var btnChoices = document.createElement("BUTTON");
        btnChoices.setAttribute("id", i);

        //append btnChoices to quiz container and quizContainer to document
        
        document.body.appendChild(quizContainer)
        quizContainer.appendChild(btnChoices);
        


        //target each of the btnChoices inner text and input questions[qcounter].multipleChoices[i}]
        questionPrompt.innerText =questions[qCounter].prompt

        btnChoices.innerText = questions[qCounter].multipleChoice[i];
        finalAnswer= questions[qCounter].answer
        console.log("final answer = " + finalAnswer);
        selectedChoice = '';
        console.log(selectedChoice + "loop selected choice")
        btnChoices.addEventListener('click',function(){
            selectedChoice = document.getElementById(this.id).innerText;
            console.log(selectedChoice);
            alert("button clicked " + this.id)
            console.log("selected choice" + selectedChoice);
            solutions();
        });  
    }
    
    finalAnswer= questions[qCounter].answer
    console.log("final answer = " + finalAnswer); 
}

var solutions = function(){
 
    if(finalAnswer === selectedChoice){
        console.log(finalAnswer + "final answer")
        console.log(selectedChoice)
        alert("correct")
        console.log(buttonChoices[qCounter]);
        document.getElementsByClassName('.button-wrapper qCounter' ).style.display ="none";
        //buttonChoices.setAttribute("style", 'display:none');
        //buttonChoices = document.getElementsByTagName("div").style.visibility = "hidden";
        score ++;
        scoreEl.textContent = score;
        qCounter ++
        console.log(qCounter + " Question");
        
        establishButtons();
    }
    else{
        alert("incorrect answer")
        console.log(finalAnswer + "final answer")
        console.log(selectedChoice)
        if(score == 0){
            alert("You lost the game")
            clearInterval(timeInterval);
        }
        else{
            score --;
            scoreEl.textContent = score;
            timeLeft = timeLeft - 10;
            qCounter ++;
            console.log(qCounter + " Question");
            establishButtons();
        }
        
        //qcounter ++;
        
    }

}

//start game with the click of the start button
start.addEventListener("click",function(){
    alert("start button has been clicked");
    document.getElementById("welcome").style.display = "none";
    document.getElementById("startGame").style.display = "none";
    countdown();
    qCounter ++;
    establishButtons();
});


