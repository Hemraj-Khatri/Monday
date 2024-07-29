import bcrypt from "bcryptjs";
const users = [
    {
       name:"admin",
        email: "admin@example.com",
       password: bcrypt.hashSync("password", 10),
        isAdmin:true,
    },{
        name: "John Doe",
        email: "john.deo@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,

    },{
        name: "John Doe1",
        email: "john.deo1@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,

    }
];
export default users;