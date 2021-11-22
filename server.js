const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan')
require('dotenv').config();



// Import Routes
const userRoute = require('./Routers/user');
const testRoute = require('./Routers/test');
const billRoute = require('./Routers/bill');
const resultRoute = require('./Routers/result');



// Midel
// app.use(cors({
//   origin: ["http://localhost:3000","http://localhost:19006","http://127.0.0.1:5500"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// }));
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



// DB
mongoose.connect(process.env.DB || 'mongodb://127.0.0.1:27017/lap',
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log('connect success')
);



// Routs
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tests', testRoute);
app.use('/api/v1/bills', billRoute);
app.use('/api/v1/results', resultRoute);



app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000');
});