const validator = require('../helpers/validate');

const saveAirport = (req, res, next) => {
  const validationRules = {
    airportName: 'required|string',
    airportCode: 'required|string|min:3|max:4',
    cityLocation: 'required|string',
    helipadsAvailable: 'required|integer|min:0',
    providesJetFuel: 'required|boolean'
  };

  validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveHelicopter = (req, res, next) => {
  const validationRules = {
    tailNumber: 'required|string|min:3',
    modelName: 'required|string',
    manufacturer: 'required|string',
    yearManufactured: 'required|integer|min:1900|max:2030',
    useType: 'required|string',
    passengerCapacity: 'required|integer|min:1',
    maxRangeNauticalMiles: 'required|integer|min:1',
    assignedAirportId: 'required|string|regex:/^[0-9a-fA-F]{24}$/' // Validates it is a 24-character hex MongoDB ID string
  };

  validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveWeather = (req, res, next) => {
  const validationRules = {
    stationId: 'required|string|min:3|max:4',
    timestamp: 'string', // Optional date string format
    temperatureCelsius: 'numeric',
    windSpeedKnots: 'required|integer|min:0',
    windDirectionDegrees: 'required|integer|min:0|max:360',
    visibilityMiles: 'required|numeric|min:0',
    flightCategory: 'required|string|in:VFR,IFR,MVFR,LIFR',
    rawMetar: 'string'
  };

  validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const savePilot = (req, res, next) => {
  const validationRules = {
    employeeId: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    status: 'required|string|in:On Duty,Off Duty,On Leave,Suspended',
    certifications: 'required|array',
    medicalClassExpiration: 'required|string', // Date string format
    totalFlightHours: 'required|integer|min:0'
  };

  validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveAirport,
  saveHelicopter,
  saveWeather,
  savePilot
};
