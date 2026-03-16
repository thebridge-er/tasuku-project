export default class Space {

  constructor(id, name, users = [], tasks = [], createDate,ownerId) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.tasks = tasks;
    this.createDate= createDate;
    this.ownerId= ownerId ;
  }

}