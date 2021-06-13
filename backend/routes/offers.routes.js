const OfferRouter = require('express').Router();
const offers = require('../controllers/offers');
const auth = require('../middlewares/authMiddleware');
const uploadFiles = require('../middlewares/uploadHelper');

OfferRouter.route('/add-offer').post(
  auth.isLogedin,
  uploadFiles,
  offers.createOffers
);

OfferRouter.route('/get-all-offers').get(offers.getAllOffers);
OfferRouter.route('/get-current-offers').get(offers.getCurrentOffers);

OfferRouter.route('/edit-offer').patch(
  auth.isLogedin,
  uploadFiles,
  offers.updateOffers
);

OfferRouter.route('/delete-offer').delete(auth.isLogedin, offers.deleteOffers);

module.exports = OfferRouter;
