const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET: Retrieve all weather reports
const getAllWeather = async (req, res) => {
  // #swagger.tags = ['Weather']
  try {
    const lists = await mongodb.getDatabase().db().collection('weather').find().toArray();
    
    if (lists) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res.status(500).json({ message: 'Some error occurred while retrieving weather reports.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving weather reports.' });
  }
};

// POST: Add a new weather report
const createWeather = async (req, res) => {
  // #swagger.tags = ['Weather']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Weather report data layout.',
      required: true,
      schema: { $ref: '#/definitions/WeatherInput' }
} */
  try {
    // Validate that incoming body data exists
    if (!req.body.stationId || !req.body.flightCategory) {
      return res.status(400).json({ message: 'Bad Request: Missing required weather fields.' });
    }

    const weatherReport = {
  stationId: req.body.stationId,
  assignedAirportId: req.body.assignedAirportId, // Captured from body
  timestamp: req.body.timestamp || new Date().toISOString(),
  temperatureCelsius: req.body.temperatureCelsius,
  windSpeedKnots: req.body.windSpeedKnots,
  windDirectionDegrees: req.body.windDirectionDegrees,
  visibilityMiles: req.body.visibilityMiles,
  flightCategory: req.body.flightCategory,
  rawMetar: req.body.rawMetar
};


    const response = await mongodb.getDatabase().db().collection('weather').insertOne(weatherReport);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the weather report.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while creating the weather report.' });
  }
};

// GET: Retrieve a single weather report by its ID
const getSingleWeather = async (req, res) => {
  // #swagger.tags = ['Weather']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid weather id to find a weather report.' });
    }

    const weatherId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('weather')
      .find({ _id: weatherId })
      .toArray();

    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]); 
    } else {
      res.status(404).json({ message: 'Weather report not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving the weather report.' });
  }
};

// PUT: Update an existing weather report
const updateWeather = async (req, res) => {
  // #swagger.tags = ['Weather']
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Weather report data layout.',
      required: true,
      schema: { $ref: '#/definitions/WeatherInput' }
    } */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid weather id to update a weather report.' });
    }
    
    const weatherId = new ObjectId(req.params.id);
    const weatherReport = {
      stationId: req.body.stationId,
      assignedAirportId: req.body.assignedAirportId,
      timestamp: req.body.timestamp,
      temperatureCelsius: req.body.temperatureCelsius,
      windSpeedKnots: req.body.windSpeedKnots,
      windDirectionDegrees: req.body.windDirectionDegrees,
      visibilityMiles: req.body.visibilityMiles,
      flightCategory: req.body.flightCategory,
      rawMetar: req.body.rawMetar
    };

    const response = await mongodb.getDatabase().db().collection('weather').replaceOne({ _id: weatherId }, weatherReport);
    
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the weather report.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while updating the weather report.' });
  }
};

// DELETE: Remove a weather report
const deleteWeather = async (req, res) => {
  // #swagger.tags = ['Weather']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid weather id to delete a weather report.' });
    }
    
    const weatherId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('weather').deleteOne({ _id: weatherId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the weather report.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while deleting the weather report.' });
  }
};

module.exports = {
  getAllWeather,
  createWeather,
  getSingleWeather,
  updateWeather,
  deleteWeather
};
