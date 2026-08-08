const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET: Retrieve all pilots
const getAllPilots = async (req, res) => {
  // #swagger.tags = ['Pilots']
  try {
    const lists = await mongodb.getDatabase().db().collection('pilots').find().toArray();
    
    if (lists) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res.status(500).json({ message: 'Some error occurred while retrieving pilots.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving pilots.' });
  }
};

// POST: Add a new pilot
const createPilot = async (req, res) => {
  // #swagger.tags = ['Pilots']
  try {
    // Validate that incoming body data exists
    if (!req.body.firstName || !req.body.lastName || !req.body.employeeId) {
      return res.status(400).json({ message: 'Bad Request: Missing required pilot fields.' });
    }

    const pilot = {
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: req.body.status, // e.g., "On Duty", "Off Duty"
      certifications: req.body.certifications, // Array expected
      medicalClassExpiration: req.body.medicalClassExpiration,
      totalFlightHours: req.body.totalFlightHours,
      assignedHelicopterId: req.body.assignedHelicopterId
    };

    const response = await mongodb.getDatabase().db().collection('pilots').insertOne(pilot);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the pilot.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while creating the pilot.' });
  }
};

// GET: Retrieve a single pilot by ID
const getSinglePilot = async (req, res) => {
  // #swagger.tags = ['Pilots']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid pilot id to find a pilot.' });
    }

    const pilotId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('pilots')
      .find({ _id: pilotId })
      .toArray();

    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]); 
    } else {
      res.status(404).json({ message: 'Pilot not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving the pilot.' });
  }
};

// PUT: Update an existing pilot
const updatePilot = async (req, res) => {
  // #swagger.tags = ['Pilots']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid pilot id to update a pilot.' });
    }
    
    const pilotId = new ObjectId(req.params.id);
    const pilot = {
      employeeId: req.body.employeeId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: req.body.status,
      certifications: req.body.certifications,
      medicalClassExpiration: req.body.medicalClassExpiration,
      totalFlightHours: req.body.totalFlightHours,
      assignedHelicopterId: req.body.assignedHelicopterId
    };

    const response = await mongodb.getDatabase().db().collection('pilots').replaceOne({ _id: pilotId }, pilot);
    
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the pilot.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while updating the pilot.' });
  }
};

// DELETE: Remove a pilot
const deletePilot = async (req, res) => {
  // #swagger.tags = ['Pilots']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid pilot id to delete a pilot.' });
    }
    
    const pilotId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pilots').deleteOne({ _id: pilotId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the pilot.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while deleting the pilot.' });
  }
};

module.exports = {
  getAllPilots,
  createPilot,
  getSinglePilot,
  updatePilot,
  deletePilot
};
