import 'dotenv/config'
import pgInstance from 'pg';

export const db = async () =>
{
  const {Client} =pgInstance;
  const client = new Client(process.env.DATABASE_URL);
client.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });
return client;  
}
