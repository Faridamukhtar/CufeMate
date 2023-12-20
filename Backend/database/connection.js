import 'dotenv/config'
import pgInstance from 'pg';

const dbConnect = async () =>
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
export const dbInstance = await dbConnect();


/*import 'dotenv/config';
import pgPromise from 'pg-promise';

const initOptions = {
  // Initialization options, add more if needed
};

const pgp = pgPromise(initOptions);

const dbConnect = async () => {
  const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // add this if using a secure connection
  };

  const db = pgp(connection);

  try {
    await db.connect();
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export const dbInstance = await dbConnect();*/
