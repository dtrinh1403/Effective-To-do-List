export class ToDoList {
    constructor(){
        this.toDoListArray = [];
    }

    addToDoList = (task)=>{
        this.toDoListArray.push(task);
     }

     renderToDoList = ()=>{
         //reverse reduce from bot to top
         let content = "";
       content = this.toDoListArray.reduceRight((toDoListContent,arrayTaskItem,index)=>{
              toDoListContent += `
                    <li>
                     <span> ${arrayTaskItem.taskName} </span>

                     <div class = "buttons d-flex ">
                      <button class = "remove" data-index = "${index}" data-status ="${arrayTaskItem.taskStatus}" onclick = "removeTask(event)"> <i class="fa fa-trash-alt"></i> </button>
                      <button class = "complete" data-index = "${index}" data-status ="${arrayTaskItem.taskStatus}" onclick = "completeTask(event)"> <i class="fa fa-vote-yea"></i></button>
                     </div>
                    
                    </li>
              
              `
              return toDoListContent;
       },"");

       return content;
     }

     removeToDoList = (index) =>{
        this.toDoListArray.splice(index,1);
     }

     sortToDoList = (isDES)=>{
       this.toDoListArray.sort((task,nextTask)=>{
            //sort ASC
            let name = task.taskName.toLowerCase();
            let nextName = nextTask.taskName.toLowerCase();
             return nextName.localeCompare(name);
       });

       if(isDES){
        this.toDoListArray.reverse();

       }
     
     }

     

     
}