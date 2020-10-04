import {ToDoTask} from "./todo.js";
import {ToDoList} from "./todoList.js";

let toDoList = new ToDoList;
let completedList = new ToDoList;


const getELE= (id) =>{
    return document.getElementById(id);
}

//======add task===========
const addTask = (()=>{
   let userInputTask = getELE("newTask").value;
   let todolistUI = getELE("todo");
   
   if (userInputTask != ""){
    let task = new ToDoTask(userInputTask, "todo");
    toDoList.addToDoList(task);
    // console.log(toDoList);
   }
   displayToDoList(todolistUI);
   
  getELE("newTask").value = "";
  
})

getELE("addItem").addEventListener("click",()=>{
    addTask();
})
//=============display ToDoList=============

const displayToDoList = (todolistUI) => {
    todolistUI.innerHTML = toDoList.renderToDoList();
}

const displayCompletedList = (completedlistUI) => {
    completedlistUI.innerHTML = completedList.renderToDoList();
}

//============delete task===============
const removeTask = (e) =>{
    
     let taskIndexToRemove = e.currentTarget.getAttribute("data-index");
      let todolistUI = getELE("todo");
      let completedlistUI = getELE("completed");
      let status = e.currentTarget.getAttribute("data-status");
     
      if(status == "todo"){
        todolistUI.innerHTML = toDoList.removeToDoList(taskIndexToRemove);
        displayToDoList(todolistUI);

      }
      else if(status == "completed"){
        completedlistUI.innerHTML = completedList.removeToDoList(taskIndexToRemove);
        displayCompletedList(completedlistUI);
      }
      else{
          alert("Can not remove task");
      }
   
}
window.removeTask = removeTask;


const completeTask = (e) =>{
    
   let taskIndexToComplete = e.currentTarget.getAttribute("data-index");
   let taskStatus = e.currentTarget.getAttribute("data-status");
   let todolistUI = getELE("todo");
   let completedlistUI = getELE("completed");

   if(taskStatus == "todo"){

     let taskToComplete = toDoList.toDoListArray.slice(taskIndexToComplete,taskIndexToComplete+1);
     let completedTask = new ToDoTask(taskToComplete[0].taskName,"completed");
    //  console.log(completedTask);

    moveTask(toDoList,completedList, completedTask, taskIndexToComplete);
    // console.log(toDoList.toDoListArray);
    // console.log(completedList);
    displayToDoList(todolistUI);
   displayCompletedList(completedlistUI);
    }
    else if(taskStatus == "completed"){
        let Undotask = completedList.toDoListArray.slice(taskIndexToComplete,taskIndexToComplete+1);
        let todoTask = new ToDoTask(Undotask[0].taskName,"todo");
       //  console.log(completedTask);
   
       moveTask(completedList,toDoList, todoTask, taskIndexToComplete);
       // console.log(toDoList.toDoListArray);
       // console.log(completedList);
       displayToDoList(todolistUI);
      displayCompletedList(completedlistUI);

    }
}
window.completeTask = completeTask;

const moveTask = (start, end , completedTask , taskIndex ) => {
   //Remove task from start array
   start.removeToDoList(taskIndex);

   //Add task to end array
   end.addToDoList(completedTask);
}

//================Sort Tasks==================
const sortASC = (e) =>{
    let todolistUI = getELE("todo");
    toDoList.sortToDoList(false);
    displayToDoList(todolistUI);
}

const sortDES = (e) =>{
    let todolistUI = getELE("todo");
    toDoList.sortToDoList(true);
    displayToDoList(todolistUI);
}
window.sortASC = sortASC;
window.sortDES = sortDES;

//==================day schedule===========
const schedule =()=>{
 let defaultDay = getELE("date");

 defaultDay.innerHTML = `
   
    <input type = "text"  placeholder = "Customize day... !" > 
    
`
defaultDay.style.border = "none";
}

window.schedule = schedule;




