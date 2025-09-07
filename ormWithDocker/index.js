require("dotenv/config");
const db=require('./db');
const {userTable}=require('./drizzle/schema')
async function getAllUsers(){
    // const users=await db.select().from(usersTable);
    const users=await db.select().from(userTable);
    console.log(users);
    return users;
}
async function createUser({id,name,email}) {
        try {
                await db.insert(userTable).values({id,name,email});

        } catch (error) {
            console.error(error);
        }
}
// createUser({id: 2,name:"sahil",email:"rahul@gmail.com"});
getAllUsers();