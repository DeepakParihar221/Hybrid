const express = require('express');
const connectDB = require('./config/db');


const app = express();

//connect to database
connectDB();

//Init middleware
app.use(express.json());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/buyer', require('./routes/api/buyer'));
app.use('/api/seller', require('./routes/api/seller'));

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})