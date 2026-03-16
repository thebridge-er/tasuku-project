export default class User{
    constructor(id, name, email, points = 0,role,createdAt){
    this.id = id;
    this.name = name;
    this.email = email;
    this.points = points;
    this.role = role;
    this.createdAt=createdAt;
    }
}