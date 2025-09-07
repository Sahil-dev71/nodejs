const {defineConfig}=require("drizzle-kit");
// const schemaa=require("");
const config=defineConfig({
    out: './drizzle',
    dialect: 'postgresql',
    schema: "./drizzle/schema.js",
     dbCredentials: {
    url:process.env.DATABASE_URL,
  },
});
module.exports=config;