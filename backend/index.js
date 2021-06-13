require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const chalk = require('chalk');

//For creating demo admin
const auth = require('./controllers/auth');
//Routes imports
const authRoute = require('./routes/auth.routes');
const offerRoute = require('./routes/offers.routes');

//express init
const app = express();
//PORT
const port = process.env.PORT || 3000;

//DB Connection
const db = mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

db.then(() => {
  console.log(chalk.green('connection Success!!'));
});

db.catch(() => {
  console.log(chalk.red('connection faild!!'));
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

//Create a demo admin @ 1st
auth.createAdmin();
//Routes
app.use('/auth', authRoute);
app.use('/offers', offerRoute);

//Server Runnig
app.listen(port, () => {
  console.log(chalk.blue(`Server Running on ${port}`));
});
