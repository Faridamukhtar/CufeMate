import 'dotenv/config'
import pgInstance from 'pg';

export const db = () =>
{
  const {Client} =pgInstance;
  const client = new Client(process.env.DATABASE_URL);
  client.connect((err) => {
  client.query('SELECT $1::text as message', ['DB Connected'], (err, res) => 
    {
      err ? console.log(err.stack): ()=>
      {
        console.log(res.rows[0].message);
        return (client);
      }
    })
  })
}