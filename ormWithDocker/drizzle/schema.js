const {pgTable,integer,varchar}=require("drizzle-orm/pg-core");
const userTable=pgTable("userTable",{
    id:integer().primaryKey(),
    name : varchar({length:255}).notNull(),
    email:varchar({length:255}).notNull().unique()
})
module.exports={userTable};