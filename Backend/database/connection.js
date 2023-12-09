import 'dotenv/config'
import pgInstance from 'pg';

export const db = async () =>
{
  const {Client} =pgInstance;
<<<<<<< Updated upstream
  const client = new Client(process.env.DATABASE_URL);
=======
  //const client = new Client(process.env.DATABASE_URL);
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
  });
>>>>>>> Stashed changes
  client.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });

  return client;  
}