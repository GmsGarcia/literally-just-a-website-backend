import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
})

connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.stack)
    }
    console.log('Db a funfar madje')
});

export default connection