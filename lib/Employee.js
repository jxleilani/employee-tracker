class Employee {
    constructor(id, firstName, lastName, roleID, managerID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    }
    getID(){
        return this.id;
    }
    setID(id){
        this.id = id;
    }
    getName(){
        return this.firstName;
    }
    setName(name){
        this.name = name;
    }
    getRole(){
        return this.roleID;
    }
    setRole(roleID){
        this.roleID = roleID;
    }
}

module.exports = Employee;