import { pgTable, varchar,text,uuid,integer, timestamp ,pgEnum} from "drizzle-orm/pg-core";
export const roleEnum=pgEnum("role",["USER","ADMIN"],"models",["a","b"]);
export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password:text().notNull(),
  role:roleEnum("role").notNull().default("USER"),
  salt:text().notNull(),
});

export const userSession=pgTable("sessions",{
  id:uuid().primaryKey().defaultRandom(),
  userId:uuid().references(()=>usersTable.id).notNull(),
  createdAt:timestamp().defaultNow().notNull(),
})
