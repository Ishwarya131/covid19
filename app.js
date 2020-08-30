const qno = document.querySelector(".q-number");
const qtext = document.querySelector(".q-text");
const optionbox = document.querySelector(".option-box");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let qcount = 0;
let currentq;
let availableq = [];
let availableoptions = [];
var incorrect = new Audio('audio/wrong.mp3');
var rights = new Audio('audio/correct.mp3');
let correctanswers = 0;
let attempt = 0;



function setAvailableQ(){

    const TotalQuestion = quiz.length;
    for(let i = 0; i<TotalQuestion; i++){
        availableq.push(quiz[i])
    }
}

function getNewQ(){

    qno.innerHTML = "Covid Quiz " + (qcount+1) + " of " + (quiz.length);

    const questionIndex = availableq[Math.floor(Math.random() * availableq.length)]
    currentq = questionIndex;
    qtext.innerHTML = currentq.q;

    const index1 = availableq.indexOf(questionIndex);
    availableq.splice(index1,1);

    const optionlen = currentq.options.length;

    for(let i = 0; i<optionlen;i++){
        availableoptions.push(i)
    }

    optionbox.innerHTML = '';
    let animationDelay = 0.15;


    for(let i = 0;i<optionlen;i++){

        const optionindex = availableoptions[Math.floor(Math.random() * availableoptions.length)]
        const index2 = availableoptions.indexOf(optionindex);
        availableoptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentq.options[optionindex];
        option.id = optionindex;

        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;

        option.className = "option";
        optionbox.appendChild(option)
        option.setAttribute("onclick","getresult(this)")

    }

    qcount++;

}

function getresult(element){
    const id = parseInt(element.id);
    if(id === currentq.answer){
        element.classList.add("correct");
        rights.play();
        correctanswers++;

    }
    else{
        element.classList.add("wrong");
        incorrect.play();

        const optionlen = optionbox.children.length;
        for(let i =0; i<optionlen ; i++){
            if(parseInt(optionbox.children[i].id) === currentq.answer){
                optionbox.children[i].classList.add("correct");
            }
        }
        alert("Oops! Wrong answer!");
    }
    attempt++;
    unclickableoptions();
}

function unclickableoptions(){
    const optionlen = optionbox.children.length;
    for(let i = 0; i<optionlen; i++){
        optionbox.children[i].classList.add("already-answered");
    }
}



function next(){
    if(qcount === quiz.length){
        console.log("quiz over");
        quizover();
    }
    else{
        getNewQ();
    }
}



function quizover(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizresult();

}

function quizresult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctanswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctanswers;
    const percentage = ((correctanswers - (attempt-correctanswers)/9)/ quiz.length) * 10;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) ;

}

function resetquiz(){

 qcount = 0;
 correctanswers = 0;
 attempt = 0;

}

function startagain(){
    resultBox.classList.add("hide");
    quizBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetquiz();
   // startquiz();
}



function startquiz(){

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQ();
    getNewQ();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}