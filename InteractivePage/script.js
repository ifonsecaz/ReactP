var visibleCalc=1;
var visibleList=1;

function toogleVisible(a,id,idButton){
    //if(document.getElementById("calc").style.display == 'block'){
    if(a==1){
        document.getElementById(id).style.display = 'none';
        const but = document.getElementById(idButton);
        but.textContent = "Show";
    }
    else{
        document.getElementById(id).style.display = 'block';
        const but = document.getElementById(idButton);
        but.textContent = "Hide";
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText !== "") {
        const ul = document.getElementById("todoList");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute('id','editTaskButton');

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";
        removeButton.setAttribute('id','removeTaskButton');

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        ul.appendChild(li);

        input.value = "";
    }
    else {
            //alert("Please enter a valid task.");
            showError("taskError","Please enter a valid task");
        }
}

const rateSlidder = document.getElementById("rate");
rateSlidder.addEventListener("click",(e)=>{
    var rateval=document.getElementById("rate").value;
    document.getElementById("rate_val").innerText=rateval;
});
        

const interestButton = document.getElementById("interestButton");
interestButton.addEventListener("click", (e) =>{
    var p = document.getElementById("principal").value;
    var r=document.getElementById("rate").value;
    var y=document.getElementById("years").value;

    if(p<=0){
        //window.alert("Enter a positive number");
        showError("principalError","Enter a positive number");
        document.getElementById("principal").focus();
        
    }
    else{
        var i=p*y*r/100;
        var amount=parseInt(p)+parseFloat(i);
        var fecha=new Date().getFullYear()+parseInt(y);
        var result=document.getElementById("result");
        result.innerHTML=`If you deposit \$${p} \<br\> at an interest rate of ${r}%.\<br\> You will receive an amount of \$${i}\<br\> in the year ${fecha}`; 
        showSuccess("calcSuccess","Success");
        
    }
})

const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click",(e)=>{
    addTask();
});

//Event delegation for buttons dynamically created
const deleg = document.getElementById("todoList");
deleg.addEventListener("click", (e)=>{
    const li = e.target.closest('li');
    if(e.target.id==='removeTaskButton'){
        li.remove();
    }
    else if(e.target.id==='editTaskButton'){
        const span = li.querySelector('span');
        const newTask = prompt("Edit your task:", span.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask.trim(); 
        }
    }
});

const calcHide = document.getElementById("hideCalculator");
calcHide.addEventListener("click",(e)=>{
    toogleVisible(visibleCalc,"calc","hideCalculator");
    visibleCalc=1-visibleCalc;
});

const listHide = document.getElementById("hideList");
listHide.addEventListener("click",(e)=>{
    toogleVisible(visibleList,"list","hideList");
    visibleList=1-visibleList;
});

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  const inputElement = document.getElementById(elementId.replace('Error', ''));
  if (inputElement) {
    inputElement.classList.add('input-error');
    inputElement.focus();
    
    setTimeout(() => {
      inputElement.classList.remove('input-error');
    }, 500);
  }
  
  setTimeout(() => {
    hideError(elementId);
  }, 5000);
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function showSuccess(elementId, message) {
  const successElement = document.getElementById(elementId);
  successElement.textContent = message;
  successElement.style.display = 'block';
  
  setTimeout(() => {
    successElement.style.display = 'none';
  }, 5000);
}