export default class User {
  constructor(id, name, email, spaces = [], points = 0, role, createDate = new Date()) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.spaces = spaces;
    this.points = points;
    this.role = role;
    this.createDate = createDate;
  }

/*FUNCIONES*/
joinSpace(spaceId){

  if(!this.spaces.includes(spaceId)){
    this.spaces.push(spaceId);
  }

}
leaveSpace(spaceId){

  this.spaces = this.spaces.filter(id => id !== spaceId);

}
addPoints(points){

  this.points += points;

}
removePoints(points){

  this.points -= points;

  if(this.points < 0){
    this.points = 0;
  }

}
getSpaces(){

  return this.spaces;

}
}