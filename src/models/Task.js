export default class Task {
  constructor(id, title, description, difficulty, createDate, assignedUserId = null, dueDate = null, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.createDate = createDate;
    this.assignedUserId = assignedUserId;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  assignUser(userId) {
    this.assignedUserId = userId;
  }

  unassignUser() {
    this.assignedUserId = null;
  }

  complete() {
    this.completed = true;
  }
}