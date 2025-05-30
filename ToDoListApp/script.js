var visibleList=1;
var taskId=1;
var tasklist=new Array();

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

function correctID(){
  let id=1;
  const collection = document.getElementsByClassName("tasktableid");
  for (let i = 1; i < collection.length; i++) {
    collection[i].innerHTML=i;
  }
}

function count() {
  let total=tasklist.length;
  let totalC=0;
  tasklist.forEach(function (arrayItem) {
    if(arrayItem.completed==true){
      totalC+=1;
    }
  
  });
  let span= document.getElementById("taskcount");
  span.textContent="Task count: "+ total;
  span=document.getElementById("taskcountCompleted");
  span.textContent="Tasks completed: " +totalC;
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText !== "") {
        const ul = document.getElementById("todoList");

        const li = document.createElement("li");
        li.setAttribute("class","tasklistssss");

        //const span = document.createElement("span");
        
        const table=document.createElement("table");
        table.setAttribute("class","tasktable");
        const tr=table.insertRow();
        const td1=tr.insertCell();
        td1.innerHTML=taskId;
        td1.setAttribute("class","tasktableid");
        const td2=tr.insertCell();
        td2.innerHTML=taskText;
        const td3=tr.insertCell();
        td3.setAttribute("class","taskCompleted");
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'taskCompletedF');
        td3.appendChild(checkbox);


        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.marginTop = '10px'; 


        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute('id','editTaskButton');

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";
        removeButton.setAttribute('id','removeTaskButton');

        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(removeButton);

        li.appendChild(table);
        li.appendChild(buttonWrapper);

        ul.appendChild(li);

        let custTask={
          description:taskText,
          completed:false
        }
        tasklist.push(custTask);

        input.value = "";
        taskId+=1;
        count();
    }
    else {
            //alert("Please enter a valid task.");
            showError("taskError","Please enter a valid task");
        }
}


const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click",(e)=>{
    addTask();
});

//Event delegation for buttons dynamically created
const deleg = document.getElementById("todoList");
deleg.addEventListener("click", (e)=>{
    const li = e.target.closest('li');
    if(e.target.id==='removeTaskButton'){
        const id = li.querySelectorAll('td')[0].innerHTML;
        li.remove();
        tasklist.splice(id-1,1);
        taskId-=1;
        correctID();
        count();
    }
    else if(e.target.id==='editTaskButton'){
        const td = li.querySelectorAll('td')[1];
        const newTask = prompt("Edit your task:", td.innerHTML);
        if (newTask !== null && newTask.trim() !== "") {
            td.innerHTML = newTask.trim(); 
        }
    }
    else if(e.target.id==='taskCompletedF'){
      const td = li.querySelectorAll('td')[1];
      const id = li.querySelectorAll('td')[0].innerHTML;
      if (e.target.checked == true){
        td.style.textDecoration="line-through";
        tasklist.at(id-1).completed=true;
      } else {
        td.style.textDecoration="";
        tasklist.at(id-1).completed=false;
      }
      count();
    }
});


const listHide = document.getElementById("hideList");
listHide.addEventListener("click",(e)=>{
    toogleVisible(visibleList,"todoList","hideList");
    visibleList=1-visibleList;
});

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
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

const inputElement = document.getElementById('taskSearch'); 
inputElement.addEventListener('input', function() {
  const collection = document.getElementsByClassName("tasklistssss");
  const searchText = inputElement.value.trim();
  if(searchText!=""){
    for (let i = 0; i < collection.length; i++) {
      if(!collection[i].querySelectorAll('td')[1].innerHTML.includes(searchText)){
          collection[i].style.display = 'none';
      }
      else{
        collection[i].style.display = 'block';
      }
    }
  }
  else{
    for (let i = 1; i < collection.length; i++) {
      
          collection[i].style.display = 'block';
    }
  }

});