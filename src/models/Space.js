export default class Space {

  constructor(id, name,ownerId, users = [], tasks = [], createDate= new Date()) {
    this.id = id;
    this.name = name;
    this.ownerId= ownerId;
    this.users = users;
    this.tasks = tasks;
    this.createDate= createDate;
    this.taskTemplates = [];
    
  }



/*FUNCIONES*/

addUser(userId){
  if(!this.users.includes(userId)){
    this.users.push(userId);
    this.assignTasks();
  }
};

removeUser(userId){
  this.users= this.users.filter(id=> id!==userId);
  this.assignTasks();
}

createTask(task){
  this.tasks.push(task);
  this.assignTasks();
}

removeTask(taskId){
  this.tasks = this.tasks.filter(id => id !== taskId)
  this.assignTasks();
}

getTasks(){
  return this.tasks;
}

hasUser(userId){
  return this.users.includes(userId);
}

hasTask(taskId){
  return this.tasks.some(t => t.id === taskId);
};


getUserCount(){
  return this.users.length;
};
/*createDefaultTemplates(){

  this.taskTemplates = añadir del localstorage

}*/
generateTasksFromTemplates(){

  this.tasks = this.taskTemplates.map((template, index) => {
    return new Task(
      Date.now() + index,
      template.title,
      "",
      template.difficulty,
      new Date()
    );
  });

  this.assignTasks(); 
}


assignTask(taskId, userId){
  const task = this.tasks.find(t => t.id === taskId);

  if(!task) {
    console.log("Task no existe");
    return;
  }

  if(!this.users.includes(userId)){
    console.log("User no pertenece al espacio");
    return;
  }

  task.assignUser(userId);
}
assignTasks(){

  if(this.users.length === 0 || this.tasks.length === 0) return;

  // 1. Resetear asignaciones
  this.tasks.forEach(task => task.unassignUser());

  // 2. Mezclar tareas
  const shuffledTasks = [...this.tasks].sort(() => Math.random() - 0.5);

  // 3. Separar por dificultad
  const easy = shuffledTasks.filter(t => t.difficulty === "easy");
  const medium = shuffledTasks.filter(t => t.difficulty === "medium");
  const hard = shuffledTasks.filter(t => t.difficulty === "hard");

  // 4. Unirlas (orden equilibrado)
  const orderedTasks = [...easy, ...medium, ...hard];

  // 5. Reparto round-robin
  let userIndex = 0;

  orderedTasks.forEach(task => {
    const userId = this.users[userIndex];

    task.assignUser(userId);

    userIndex = (userIndex + 1) % this.users.length;
  });
}
startWeek(){
  this.resetWeek();
}
resetWeek(){

  if(this.users.length === 0){
    console.log("No hay usuarios");
    return;
  }

  this.tasks = [];
  this.weekStartDate = new Date();

  this.generateTasksFromTemplates();

}


}