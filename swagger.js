const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'SLC-EMS-Ops API',
    description: 'CSE 341 - Final Project.'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
  definitions: {
    AirportInput: {
      airportName: "South Valley Regional Airport",
      airportCode: "U42",
      cityLocation: "West Jordan",
      helipadsAvailable: 2,
      providesJetFuel: true
    },
    HelicopterInput: {
      tailNumber: "N123UT",
      modelName: "AS350 B3",
      manufacturer: "Airbus Helicopters",
      yearManufactured: 2022,
      useType: "Air Ambulance",
      passengerCapacity: 5,
      maxRangeNauticalMiles: 350,
      assignedAirportId: "652f4c9c1b3d5e001f8a2b3c"
    },
    WeatherInput: {
      stationId: "KSLC",
      timestamp: "2026-08-07T23:30:00Z",
      temperatureCelsius: 24.5,
      windSpeedKnots: 12,
      windDirectionDegrees: 180,
      visibilityMiles: 10,
      flightCategory: "VFR",
      rawMetar: "KSLC 072330Z 18012KT 10SM CLR 25/11 A3002"
    },
    PilotInput: {
      employeeId: "EMP-9402",
      firstName: "Alex",
      lastName: "Mercer",
      status: "On Duty",
      certifications: ["Commercial Pilot", "Instrument Rating", "Rotorcraft-Helicopter"],
      medicalClassExpiration: "2027-04-15",
      totalFlightHours: 2450
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This script compiles your routes list and auto-generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
