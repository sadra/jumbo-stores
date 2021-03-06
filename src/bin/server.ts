import { connectDB } from './../database/Database.handler';
import { app } from './app';
require('dotenv').config();

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀  ⚡️[server]: Server is running at http://localhost:${PORT}`);
  console.log(
    `🚀  ⚡️[graphql-server]: Server is running at http://localhost:${PORT}/graphql`,
  );
});
