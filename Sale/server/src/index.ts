import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import transactionRoutes from '../src/routes/transaction-route';
import userRoutes from '../src/routes/user-route'
require('dotenv').config()



const optCors: cors.CorsOptions = {
  origin:'*' ,
}
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(optCors));
app.use('/api', transactionRoutes);
app.use('/api/user', userRoutes);

const port = process.env.APP_PORT || 5500;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});