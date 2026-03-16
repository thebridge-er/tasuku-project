export default class Task {

  constructor(id, title,description, difficulty,createdAt, assignedTo = null,dueDate= null, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty; // easy, medium, hard
    this.createdAt=createdAt;
    this.assignedTo = assignedTo;
    this.dueDate =dueDate;
    this.completed = completed;
    
  }

}