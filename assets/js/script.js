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


var timer = document.getElementById('countdown');
var start = document.querySelector("#startGame");
var choice =document.getElementById("id");


var qCounter = -1;
var finalAnswer;
var selectedChoice;
var score = 0;
var chosenbtn;
var m;



var countdown = function(){
    var timeLeft = 100;

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

var establishButtons = function(){
    var quizContainer = document.createElement('div');
    quizContainer.setAttribute("class", "button-wrapper");

    for(var i = 0; i< questions[qCounter].multipleChoice.length; i++){
        console.log(qCounter); 
        var btnChoices = document.createElement("BUTTON");
        btnChoices.setAttribute("id", i);
        quizContainer.appendChild(btnChoices);
        document.body.append(quizContainer);
        document.getElementById(i).textContent = questions[qCounter].multipleChoice[i];
        
    }
    //debugger;
    finalAnswer= questions[qCounter].answer
    console.log("final answer = " + finalAnswer);
     
}

var solutions = function(){
    // selectedChoice = document.getElementById(this.id).textContent;
    //     alert("button clicked " + this.id)
    //     alert("button" + i + "clicked");
    if(finalAnswer === selectedChoice){
        alert("correct")
        //qcounter ++;
        //score ++;

    }
    else{
        alert("incorrect answer")
        //qcounter ++;
        //score --;
        //timeLeft = timeLeft - 10
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


choice.addEventListener("click",function(){
    choice = document.getElementById("#id");
    console.log(choice);
    alert("button clicked")
})