const Offers = require('../models/offers.model');

exports.createOffers = async (req, res) => {
  let params = req.body;
  // console.log('💥🔥', req.files);

  if (
    !params.title ||
    !params.url ||
    !params.fromDate ||
    !params.toDate ||
    !req.files.mobImg ||
    !req.files.desktopImg
  ) {
    var msg = '';

    if (!params.title) {
      msg = ' title cannot be empty';
    } else if (!params.url) {
      msg = 'url cannot be empty';
    } else if (!params.fromDate) {
      msg = 'fromDate cannot be empty';
    } else if (!params.toDate) {
      msg = 'toDate cannot be empty';
    } else if (!req.files.mobImg) {
      msg = 'Mobile image cannot be empty';
    } else if (!req.files.desktopImg) {
      msg = 'Desktop image cannot be empty';
    }
    return res.send({
      msg,
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  let offerDetails = {
    title: params.title,
    url: params.url,
    fromDate: params.fromDate,
    toDate: params.toDate,
    mobImg: req.files.mobImg[0].filename,
    desktopImg: req.files.desktopImg[0].filename,
  };

  if (params.position) {
    offerDetails.position = params.position;
  }

  let newOffer = new Offers(offerDetails);

  let createdOffer = await newOffer.save().catch((error) => {
    console.log(error);
    return res.send({
      msg: 'Something went wrong while register user',
      statusCode: 400,
      error: true,
      data: null,
    });
  });

  return res.send({
    msg: 'Offer created successfully',
    statusCode: 200,
    error: false,
    data: createdOffer,
  });
};

// all offers
exports.getAllOffers = async (req, res) => {
  let params = req.query;

  let findCriteria = {};

  if (params.searchText) {
    findCriteria = { title: { $regex: params.searchText, $options: 'i' } };
  }

  let offersList = await Offers.find(findCriteria)
    .lean()
    .catch((error) => {
      console.log(error);
      return {
        msg: 'Something went wrong while list Products',
        statusCode: 400,
        error: true,
        data: null,
      };
    });

  if (offersList.length > 0) {
    return res.send({
      data: offersList,
      msg: 'Offers list',
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      data: null,
      msg: 'No Offers Found',
      statusCode: 200,
      error: false,
    });
  }
};

//current offers
exports.getCurrentOffers = async (req, res) => {
  let currentDate = Date.now();
  let findCriteria = {
    fromDate: { $lte: currentDate },
    toDate: { $gte: currentDate },
  };

  let offersList = await Offers.find(findCriteria)
    .lean()
    .catch((error) => {
      console.log(error);
      return {
        msg: 'Something went wrong while list Products',
        statusCode: 400,
        error: true,
        data: null,
      };
    });

  if (offersList.length > 0) {
    return res.send({
      data: offersList,
      msg: 'Offers list',
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      data: null,
      msg: 'No Offers Found',
      statusCode: 200,
      error: false,
    });
  }
};

exports.updateOffers = async (req, res) => {
  let params = req.body;

  if (!params.id) {
    return res.send({
      msg: 'Id Can not be empty',
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  let offerDetails = {};
  if (params.title) {
    offerDetails.title = params.title;
  }
  if (params.url) {
    offerDetails.url = params.url;
  }
  if (params.fromDate) {
    offerDetails.fromDate = params.fromDate;
  }
  if (params.toDate) {
    offerDetails.toDate = params.toDate;
  }
  if (params.position) {
    offerDetails.position = params.position;
  }
  if (req.files.desktopImg) {
    offerDetails.desktopImg = req.files.desktopImg[0].filename;
  }
  if (req.files.mobImg) {
    offerDetails.mobImg = req.files.mobImg[0].filename;
  }

  let findCriteria = { _id: params.id };

  let createdProduct = await Offers.findOneAndUpdate(
    findCriteria,
    offerDetails
  ).catch((error) => {
    console.log(error);
    return res.send({
      msg: 'Something went wrong while Updating Products',
      statusCode: 400,
      error: true,
      data: null,
    });
  });

  return res.send({
    msg: 'Products successfully Updated',
    statusCode: 200,
    error: false,
    data: createdProduct,
  });
};

exports.deleteOffers = async (req, res) => {
  var params = req.query;

  if (!params.id) {
    return res.send({
      msg: 'id cannot be empty',
      statusCode: 400,
      error: true,
      data: null,
    });
  }

  var offerData = await Offers.deleteOne({ _id: params.id }).catch((error) => {
    console.log(error);
    return {
      msg: 'Something went wrong while checking Products data',
      statusCode: 400,
      error: true,
      data: null,
    };
  });

  if (offerData) {
    return res.send({
      msg: 'Offer Delete susccessfully',
      data: offerData,
      statusCode: 200,
      error: false,
    });
  } else {
    return res.send({
      msg: 'No Offers Found',
      statusCode: 400,
      error: true,
      data: null,
    });
  }
};
