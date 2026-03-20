export default class Task {
  constructor(
    id,
    title,
    description,
    priority,        //  viene de storage
    createdAt,
    assignedTo = null,
    dueDate = null,
    status = "todo",
    spaceId = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;

    //  adaptación
    this.difficulty = priority;
    this.assignedUserId = assignedTo;
    this.completed = status === "done";

    this.createDate = createdAt;
    this.dueDate = dueDate;
    this.spaceId = spaceId;
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