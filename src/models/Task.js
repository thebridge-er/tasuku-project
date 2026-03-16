export default class Task {

  constructor(id, title,description, difficulty,createDate, assignedTo = null,dueDate= null, completed = false,) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty; // easy, medium, hard
    this.createDate=createDate;
    this.assignedUserId = assignedUserId;
    this.dueDate = dueDate;
    this.completed = completed;
    this.taskAssignments ={};
  }

  
}
        /*FUNCIONES*/

assignUser(userId) {
  this.assignedUserId = userId;
}
unassignUser() {
  this.assignedUserId = null;
}
isAssigned() {
  return this.assignedUserId !== null;
}
complete() {
  this.completed = true;
}

assignTask(taskId,userId){
  if(!this.task.includes(taskId))return;
  if(!this.users.includes(userId))return;
  this.taskAssignments[taskId] =userId;
}
/*faltaria funcion asignar tareas random*/