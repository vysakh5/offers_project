const AuthRouter = require('express').Router();
const accounts = require('../controllers/auth');
const auth = require('../middlewares/authMiddleware');

AuthRouter.route('/signup').post(auth.isLogedin, accounts.signup);
AuthRouter.route('/signin').post(accounts.signin);

module.exports = AuthRouter;
