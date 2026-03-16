export default class Space {

  constructor(id, name,ownerId, users = [], tasks = [], createDate= new Date()) {
    this.id = id;
    this.name = name;
    this.ownerId= ownerId;
    this.users = users;
    this.tasks = tasks;
    this.createDate= createDate;
    
  }

}

/*FUNCIONES*/

addUser(userId){
  if(!this.users.includes(userId)){
    this.users.push(userId)
  }
}

removeUser(userId){
  this.users= this.users.filter(id=> id!==userId);
}

createTask(taskId){
  this.task.push(taskId);
}

removeTask(taskId){
  this.tasks = this.tasks.filter(id => id !== taskId);
}

getTask(){
  return this.tasks;
}

hasUser(userId){
  return this.users.includes(userId);
}

hasTask(taskId){
  return this.tasks.includes(taskId);
}

getUserCount(){
  return this.users.length;
}