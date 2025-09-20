const{text, pgTable, varchar,uuid,index}=require("drizzle-orm/pg-core");
const {sql}=require("drizzle-orm");
const authorsTable=require("./author.module");
const booksTable=pgTable("books",{
    id:uuid().primaryKey().defaultRandom(),
    title:varchar({length:100}).notNull(),
    description:text(),
    authorId:uuid().references(()=>authorsTable.id).notNull()
},
    (table)=> [
    index('title_index').using('gin', sql`to_tsvector('english', ${table.title})`),
  ]
)
module.exports=booksTable;