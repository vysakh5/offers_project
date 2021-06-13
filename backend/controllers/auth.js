require('dotenv').config();
const { pbkdf2Sync } = require('crypto');
var jwt = require('jsonwebtoken');
const chalk = require('chalk');

const User = require('../models/user.model');

const salt = process.env.KEY;

//Registring Demo Admin
exports.createAdmin = async () => {
  const demoMail = process.env.DEMO_MAIL;
  const demoPass = process.env.DEMO_PASS;

  //Checking for existing users
  const users = await User.find()
    .lean()
    .catch((error) => {
      console.log(error);
      return {
        msg: 'Something went wrong while deleting data',
        statusCode: 400,
        error: true,
        data: null,
      };
    });

  if (users.length > 0) {
    console.log(chalk.magenta('User Already Exist !'));
    console.log(
      chalk.bgBlackBright.yellowBright(
        `Email : ${demoMail} , Pass : ${demoPass} `
      )
    );

    return 1;
  } else {
    var derivedKey = pbkdf2Sync(demoPass, salt, 100, 32, 'sha512');

    let password = derivedKey.toString('hex');

    let userDetails = {
      name: 'Demo User',
      email: demoMail,
      password: password,
    };

    let newUser = new User(userDetails);

    let createdUser = await newUser.save().catch((error) => {
      console.log(error);
    });

    console.log(chalk.cyanBright('Demo admin Created Successfully '));
    console.log(
      chalk.bgBlackBright.green(`Email : ${demoMail} , Pass : ${demoPass} `)
    );
    return 0;
  }
};

//Admin Sign Up
exports.signup = async (req, res) => {
  let params = req.body;

  if (!params.name || !params.email || !params.password) {
    var msg = '';

    if (!params.name) {
      msg = ' name cannot be empty';
    } else if (!params.email) {
      msg = 'email cannot be empty';
    } else if (!params.password) {
      msg = 'password cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  let plainPassword = req.body.password;

  var derivedKey = pbkdf2Sync(plainPassword, salt, 100, 32, 'sha512');

  let password = derivedKey.toString('hex');

  let userDetails = {
    name: params.name,
    email: params.email,
    password: password,
  };

  let newUser = new User(userDetails);

  let createdUser = await newUser.save().catch((error) => {
    console.log(error);
    return res.send({
      msg: 'Something went wrong while register user',
      statusCode: 400,
      error: true,
      data: null,
    });
  });

  return res.send({
    msg: 'User successfully Registerd',
    statusCode: 200,
    error: false,
    data: createdUser,
  });
};

exports.signin = async (req, res) => {
  if (
    req.body.email == undefined ||
    req.body.password == undefined ||
    req.body.email == null ||
    req.body.password == null
  ) {
    return res.status(400).send({
      Message: 'please enter the valid username and password correctly',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
  let email = req.body.email;
  let plainPassword = req.body.password;

  var derivedKey = pbkdf2Sync(plainPassword, salt, 100, 32, 'sha512');

  let pass = derivedKey.toString('hex');

  let signinUser = await User.findOne({ email: email, password: pass }).lean();
  // console.log('--------------------');
  // console.log(signinUser);

  if (!signinUser) {
    return res.send({
      msg: 'User Not found',
      statusCode: 404,
      error: false,
      data: signinUser,
    });
  }
  signinUser.password = null;

  let token = jwt.sign(signinUser, process.env.SECRET, {
    expiresIn: 60000,
  });

  return res.status(200).send({
    msg: 'User authentication successfull ',
    statusCode: 200,
    auth: true,
    error: false,
    token: token,
    data: signinUser,
  });
};
