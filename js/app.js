const qno = document.querySelector(".q-number");
const qtext = document.querySelector(".q-text");
const optionbox = document.querySelector(".option-box");
const IndicatorBox = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");



let qcount = 0;
var a=0;
let currentq;
let availableq = [];
let availableoptions = [];
var incorrect = new Audio('audio/wrong.mp3');
var rights = new Audio('audio/correct.mp3');
let correctanswers = 0;
let attempt = 0;
let prevQues = [];
var bscore=0;
var ans=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
if (typeof(Storage) !== "undefined") {
if(localStorage.getItem("bests")){
bscore=Number(localStorage.getItem("bests"));
document.getElementById("bscore").innerHTML=bscore;
}
else{
localStorage.setItem("bests","0");
document.getElementById("bscore").innerHTML = localStorage.getItem("bests");
}
}



function setAvailableQ() {

    const TotalQuestion = quiz.length;
    for (let i = 0; i < TotalQuestion; i++) {
        availableq.push(quiz[i])
    }
}

function getNewQ() {
    console.log(prevQues);
    console.log(qcount);
    // console.log(n);
   
    qno.innerHTML = "Covid Quiz " + (qcount + 1) + " of " + (quiz.length);

    if (prevQues.length > qcount && prevQues.length) {
        currentq = prevQues[qcount];
        qtext.innerHTML = currentq.q;
    
        // q[qcount].classList.remove("hide");
        // q[n].classList.add("hide");
        // qcount = n;
        const optionlen = currentq.options.length;
    
        optionbox.innerHTML = '';
        let animationDelay = 0.15;
        for (let i = 0; i < optionlen; i++) {
    
            const option = document.createElement("div");
            option.innerHTML = currentq.options[i];
            option.id = i;
    
            option.style.animationDelay = animationDelay + 's';
            animationDelay = animationDelay + 0.15;
            option.className = "option";
        optionbox.appendChild(option);

        if(ans[qcount]<0){
            option.setAttribute("onclick", "getresult(this)");  
           }
         else{
           
                if(ans[qcount]==parseInt(currentq.answer) && parseInt(option.id)==ans[qcount]){
                    option.classList.add("correct");
                    rights.play();
                   
            
                }
                else if(parseInt(option.id)==ans[qcount]){
                   
                    option.classList.add("wrong");
                    incorrect.play();
            
                   /* const optionlen = optionbox.children.length;
                    for(let i =0; i<optionlen ; i++){
                        if(parseInt(optionbox.children[i].id) === currentq.answer){
                            optionbox.children[i].classList.add("correct");
                        }
                    }*/
                    alert("Oops! Wrong answer!");
                }
                
                unclickableoptions();
            
         }  
           
        }
    } else {
        const questionIndex = availableq[Math.floor(Math.random() * availableq.length)]
        prevQues.push(questionIndex)
        currentq = questionIndex;
        qtext.innerHTML = currentq.q;

        const index1 = availableq.indexOf(questionIndex);
        availableq.splice(index1, 1);

        const optionlen = currentq.options.length;

        for (let i = 0; i < optionlen; i++) {
            availableoptions.push(i)
        }

        optionbox.innerHTML = '';
        let animationDelay = 0.15;


        for (let i = 0; i < optionlen; i++) {

            const optionindex = availableoptions[Math.floor(Math.random() * availableoptions.length)]
            const index2 = availableoptions.indexOf(i);
            availableoptions.splice(index2, 1);

            const option = document.createElement("div");
            option.innerHTML = currentq.options[i];
            option.id = i;

            option.style.animationDelay = animationDelay + 's';
            animationDelay = animationDelay + 0.15;

            option.className = "option";
        optionbox.appendChild(option);
        option.setAttribute("onclick", "getresult(this)");  
        
        }

    }
    const previousbtn = document.getElementById("previous");
    
    qcount++;
    if (qcount === 1) {
        previousbtn.style.display = 'none';
    } else {
        previousbtn.style.display = 'inline-block';
    }

}

function getresult(element) {
   
    const id = parseInt(element.id);
    if (id === currentq.answer) {
        ans[qcount-1]=id;
        element.classList.add("correct");
        rights.play();
        updateAnswerIndicator("correct");
        correctanswers++;

    }
    else {
        ans[qcount-1]=id;
        element.classList.add("wrong");
        incorrect.play();
        updateAnswerIndicator("wrong");

        const optionlen = optionbox.children.length;
        for (let i = 0; i < optionlen; i++) {
            if (parseInt(optionbox.children[i].id) === currentq.answer) {
                optionbox.children[i].classList.add("correct");
            }
        }
        alert("Oops! Wrong answer!");
    }
    attempt++;
    unclickableoptions();
}

function unclickableoptions() {
    const optionlen = optionbox.children.length;
    for (let i = 0; i < optionlen; i++) {
        optionbox.children[i].classList.add("already-answered");
    }
}

function prev(n) {
   
     a=n-1;
   
    qno.innerHTML = "Covid Quiz " + (n) + " of " + (quiz.length);
    currentq = prevQues[n - 1];
    qtext.innerHTML = currentq.q;


    const optionlen = currentq.options.length;
    
    optionbox.innerHTML = '';
    let animationDelay = 0.15;
    for (let i = 0; i < optionlen; i++) {

        const option = document.createElement("div");
        option.innerHTML = currentq.options[i];
        option.id = i;

        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionbox.appendChild(option);

        if(ans[a]<0){
            option.setAttribute("onclick", "getresult(this)");  
           }
         else{
           
                if(ans[a]==parseInt(currentq.answer) && parseInt(option.id)==ans[a]){
                    option.classList.add("correct");
                    rights.play();
                   
            
                }
                else if(parseInt(option.id)==ans[a]){
                   
                    option.classList.add("wrong");
                  //  incorrect.play();
            
                   /* const optionlen = optionbox.children.length;
                    for(let i =0; i<optionlen ; i++){
                        if(parseInt(optionbox.children[i].id) === currentq.answer){
                            optionbox.children[i].classList.add("correct");
                        }
                    }*/
                    alert("Oops! Wrong answer!");
                }
                
                unclickableoptions();
            
         }  
    }

    const previousbtn = document.getElementById("previous");

    if (n === 1) {
        previousbtn.style.display = 'none';
    }
    else {
        previousbtn.style.display = 'inline-block';
    }
    qcount--;
}

function showprev() {
    prev(qcount - 1);
}


function answerIndicator(){
    const totalQuestion = quiz.length;
    for(let i = 0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        IndicatorBox.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType){

    IndicatorBox.children[qcount-1].classList.add(markType);
}

function next() {
    if (qcount === quiz.length) {
        console.log("quiz over");
        quizover();
    }
    else {
        getNewQ();
    }
}



function quizover() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizresult();

}


function quizresult() {
    var Name = document.getElementById("name").value;
    document.getElementById("show").innerText = Name;

    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctanswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctanswers;
    const percentage = ((correctanswers - (attempt-correctanswers)/9)/ quiz.length) * 10;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) ;

    if(percentage>bscore){
        localStorage.setItem("bests",percentage);
        bscore=localStorage.getItem("bests");
        }
        document.getElementById("bscore").innerHTML=bscore;

}

function resetquiz() {

    qcount = 0;
    correctanswers = 0;
    attempt = 0;   

}

function startagain() {
    resultBox.classList.add("hide");
    quizBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetquiz();
    // startquiz();
}



function startquiz() {

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setTimeout(function () {
        quizover();
    }, 61000);
    setAvailableQ();
    getNewQ();
  //  answerIndicator();
}



window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}