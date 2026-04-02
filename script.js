const tasktoDo = JSON.parse(localStorage.getItem("task")) || [];
const addButton = document.querySelector("#addTaskButton");


// --------------ADD BUTTON EVENTLISTENER---------------

renderUsers();
addButton.addEventListener("click", () => {
  const taskInput = document.querySelector("#taskInput");
  const taskValue = taskInput.value.trim();
  const taskId = Number(document.querySelector("#taskId").value);
  if (!taskValue) {
    alert("Enter any Task");
  } else {
    
    tasktoDo.push({
        text : taskValue,
        isCompleted : false,
    });
    
    localStorage.setItem("task", JSON.stringify(tasktoDo));
    console.log(tasktoDo);
    renderUsers();
    taskInput.value = "";
  }
});

function renderUsers() {
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = "";

  tasktoDo.forEach((e, index) => {
    taskList.innerHTML += `
       <li>
          <span class = "${e.isCompleted ? "completed" : ""}">${e.text}</span>
          <span
            ><button ${e.isCompleted ? "disabled" : ""} class="${e.isCompleted ? "disabled" : "listButton"}" id="${!e.isCompleted ? "completeButton" : ""}" onclick="completeTask(${index})" >&#10004;</button>
            <button class="listButton" id="closeButton" onclick="deleteTask(${index})">&times;</button></span
          >
        </li>`;
    console.log(index);
  });
}


// -----------ALL CLEAR-----------------

const allClearButton = document.querySelector("#allClear");

allClearButton.addEventListener("click", ()=>{
    localStorage.removeItem("task");
    renderUsers();
})

// -----------------SINGLE CLEAR--------------------

function deleteTask(e){
    tasktoDo.splice(e,1);
    localStorage.setItem("task", JSON.stringify(tasktoDo));
    renderUsers();
}

function completeTask(e){
    tasktoDo[e].isCompleted = !tasktoDo[e].isCompleted;

    localStorage.setItem("task",JSON.stringify(tasktoDo));
    renderUsers();
}