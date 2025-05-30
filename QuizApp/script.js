const quizState = {
  questionID: 1,
  totalQuestion: 0,
  responseQ: 0,
  correctAnswers: 0
};

//GET
async function fetchData(uri) {
    try{
        let response=await fetch(uri,{
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            showError("ErrorMessage","Invalid id");
        }else{
            let data = await response.json();
            return data;
        }
    }
    catch (error){
        showError("ErrorMessage","Something went wrong", true);
    }
}

//promise para multiples llamadas en paralelo promise.all   
//o si usas funciones como settiemout, no fetch
//para llamadas localhost se requiere un server local, por CORS, se puede usar npx live-server public --port=8090
//En el html open with live server
//agregar en spring boot en el controller:  @CrossOrigin(origins = "http://127.0.0.1:5500")
async function fetchQuestion() {
  const response = await fetchData('http://localhost:8080/questions/'+quizState.questionID);
  if(response){  
    quizState.questionID+=1;
    populateQuestion(response);
    if(quizState.questionID>quizState.totalQuestion){
        let btn=document.getElementById("nextButton");
        btn.setAttribute("id","finishBtn");
        btn.textContent="Finish";
    }
  }
}

async function fetchNumber() {
  const response = await fetchData('http://localhost:8080/questions/cont');
  quizState.totalQuestion=response;  
  populateStart(response);
}

function populateQuestion(response){
    let title=document.getElementById("title");
    title.replaceChildren();
    title.textContent=response.question;
    title.appendChild(document.createElement("br"));

    let opt=document.getElementById("options");
    opt.replaceChildren();

    let formslist=new Array();
    let inplist=new Array();
    let lablist=new Array();
    for(let i=0;i<4;i++){
        formslist.push(document.createElement("div"));
        formslist[i].setAttribute("class","form-check");

        inplist.push(document.createElement("input"));
        inplist[i].setAttribute("class","form-check-input");
        inplist[i].setAttribute("type","radio");
        inplist[i].setAttribute("name","radiodef");
        inplist[i].setAttribute("id","radiodef"+i);

        lablist.push(document.createElement("label"));
        lablist[i].setAttribute("class","form-check-label");
        lablist[i].setAttribute("for","radiodef"+i);
    }

    lablist[0].textContent=response.option0;
    lablist[1].textContent=response.option1;
    lablist[2].textContent=response.option2;
    lablist[3].textContent=response.option3;

    for(let i=0;i<4;i++){
        opt.appendChild(formslist[i]);
        opt.appendChild(inplist[i]);
        opt.appendChild(lablist[i]);
    }
    quizState.responseQ=response.correct_answer;
}

function populateStart(response){
    startBtn.disabled = true;
    let span = document.createElement("span");
    span.textContent=quizState.questionID+"/"+quizState.totalQuestion;
    let el=document.getElementById("numbers");
    el.replaceChildren(span);

    el=document.getElementById("control");
    el.replaceChildren();

    let subBtn=document.createElement("button");
    subBtn.setAttribute("id","submitButton");
    subBtn.textContent="Submit answer";
    subBtn.classList.add("btn");
    subBtn.classList.add("btn-primary");

    let nextBtn=document.createElement("button");
    nextBtn.setAttribute("id","nextButton");
    nextBtn.textContent="Next question";
    nextBtn.classList.add("btn");
    nextBtn.classList.add("btn-primary");
    
    let corrA=document.getElementById("result");
    let spanA=document.createElement("span");
    spanA.setAttribute("id","numCorr");
    spanA.textContent="Correct answers: ";
    corrA.appendChild(spanA);

    let incA=document.createElement("div"); //disable submitbutton
    incA.setAttribute("id","ErrorAnswer");
    incA.setAttribute("class","error-message");
    
    el.appendChild(incA);
    el.appendChild(subBtn);
    el.appendChild(nextBtn);

    fetchQuestion();
}

function submitF(){
    if(document.querySelector('input[name="radiodef"]:checked')){
        let answer=document.querySelector('input[name="radiodef"]:checked');
        let result = answer.id.substring(answer.id.length - 1);
        if(result==quizState.responseQ-1){
            quizState.correctAnswers+=1;
            document.getElementById("numCorr").textContent="Correct answers: " + quizState.correctAnswers;
            answer.classList.add("bg-success");
        }
        else{
            showError("ErrorAnswer","Incorrect answer", false);
            answer.classList.add("bg-danger");
            let c=document.getElementById("radiodef"+(quizState.responseQ-1));
            c.classList.add("bg-success");
        }
        document.getElementById("submitButton").disabled=true;
    }
    else{
        showError("ErrorAnswer","Please select an answer", true);
    }
}

function nextQ(){
    hideError("ErrorAnswer");
    document.getElementById("submitButton").disabled=false;

    let span = document.createElement("span");
    span.textContent=quizState.questionID+"/"+quizState.totalQuestion;
    let el=document.getElementById("numbers");
    el.replaceChildren(span);

    fetchQuestion();
}

function finishQuiz(){
    let title=document.getElementById("title");
    title.replaceChildren();
    title.textContent="Congratulations, you completed the QUIZ";
    title.appendChild(document.createElement("br"));

    let opt=document.getElementById("options");
    opt.replaceChildren();
    let span=document.createElement("span");
    let perc=quizState.correctAnswers/quizState.totalQuestion*100;
    span.textContent="Result: " + quizState.correctAnswers + " - " + perc + "%";
    opt.appendChild(span);

    document.getElementById("control").replaceChildren();
    document.getElementById("result").replaceChildren();

    quizState.questionID=1;
    startBtn.disabled=false;
}

const startBtn=document.getElementById("start");
startBtn.addEventListener("click",(e)=>{
    quizState.correctAnswers=0;
    fetchNumber();
});

const deleg = document.getElementById("control");
deleg.addEventListener("click", (e)=>{
    if(e.target.id==='submitButton'){
        submitF();
    }
    else if(e.target.id==='nextButton'){
        if(document.getElementById('submitButton').disabled)
            nextQ();
        else{
           showError("ErrorAnswer","Please select an answer", true);
        }
    }
    else if(e.target.id==='finishBtn'){
        if(document.getElementById('submitButton').disabled)
            finishQuiz();
        else{
           showError("ErrorAnswer","Please select an answer", true);
        }
    }
});

function showError(elementId, message, hide) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  if(hide){
    setTimeout(() => {
        hideError(elementId);
    }, 5000);
  }
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}