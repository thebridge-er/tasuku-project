export default class Space {

  constructor(id, name, users = [], tasks = [], createdAt,ownerId) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.tasks = tasks;
    this.createdAt= createdAt;
    this.ownerId= ownerId ;
  }

}