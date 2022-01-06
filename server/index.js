require('dotenv').config(); // for use of .env file consts
const express = require('express');
const sequelize = require('./db'); // get sequelize obj with settings of DB
const models = require('./models/models'); // get models of DB
const cors = require('cors'); // enable cors for crosorigin requests
const fileUpload = require('express-fileupload');
const router = require('./routes/index'); 
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// must be last one
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // connecting to DB 
    await sequelize.sync(); // check if state of DB is sync with models shems
    app.listen(PORT, () => console.log('listen'));
  } catch (error) {
    console.log(error);
  }
}

start();