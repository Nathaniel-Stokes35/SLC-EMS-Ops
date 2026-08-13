// Import controllers
const airportController = require('../controllers/airports');
const helicopterController = require('../controllers/helicopters');
const pilotController = require('../controllers/pilots');
const weatherController = require('../controllers/weather');

// Mock MongoDB completely
jest.mock('../data/database', () => ({
  getDatabase: jest.fn()
}));

const mongodb = require('../data/database');

describe('GET and GetAll Controller Unit Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {}
    };

    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =========================================================
  // AIRPORTS
  // =========================================================

  describe('Airports', () => {

    test('getAllAirports returns 200 and all airport records', async () => {
      const fakeAirports = [
        {
          _id: '6a68505be922552500ec2d0f',
          airportName: 'South Valley Regional Airport',
          airportCode: 'U42'
        }
      ];

      const mockToArray = jest.fn().mockResolvedValue(fakeAirports);
      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray
      });
      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind
      });
      const mockDb = jest.fn().mockReturnValue({
        collection: mockCollection
      });

      mongodb.getDatabase.mockReturnValue({
        db: mockDb
      });

      await airportController.getAllAirports(
        mockRequest,
        mockResponse
      );

      expect(mockCollection).toHaveBeenCalledWith('airports');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(fakeAirports);
    });


    test('getSingleAirport returns 200 and one airport record', async () => {
        const fakeAirport = {
            _id: '6a68505be922552500ec2d0f',
            airportName: 'South Valley Regional Airport',
            airportCode: 'U42'
        };

        mockRequest.params.id = '6a68505be922552500ec2d0f';

        const mockToArray = jest.fn().mockResolvedValue([fakeAirport]);

        const mockFind = jest.fn().mockReturnValue({
            toArray: mockToArray
        });

        const mockCollection = jest.fn().mockReturnValue({
            find: mockFind
        });

        const mockDb = jest.fn().mockReturnValue({
            collection: mockCollection
        });

        mongodb.getDatabase.mockReturnValue({
            db: mockDb
        });

        await airportController.getSingleAirport(
            mockRequest,
            mockResponse
        );

        expect(mockCollection).toHaveBeenCalledWith('airports');
        expect(mockFind).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakeAirport);
        });

  });


  // =========================================================
  // HELICOPTERS
  // =========================================================

  describe('Helicopters', () => {

    test('getAllHelicopters returns 200 and all helicopter records', async () => {
      const fakeHelicopters = [
        {
          _id: '652f4c9c1b3d5e001f8a2b3c',
          tailNumber: 'N123UT',
          modelName: 'AS350 B3'
        }
      ];

      const mockToArray = jest.fn().mockResolvedValue(fakeHelicopters);
      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray
      });
      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind
      });
      const mockDb = jest.fn().mockReturnValue({
        collection: mockCollection
      });

      mongodb.getDatabase.mockReturnValue({
        db: mockDb
      });

      await helicopterController.getAllHelicopters(
        mockRequest,
        mockResponse
      );

      expect(mockCollection).toHaveBeenCalledWith('helicopters');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(fakeHelicopters);
    });


    test('getSingleHelicopter returns 200 and one helicopter record', async () => {
        const fakeHelicopter = {
            _id: '652f4c9c1b3d5e001f8a2b3c',
            tailNumber: 'N123UT',
            modelName: 'AS350 B3'
        };

        mockRequest.params.id = '652f4c9c1b3d5e001f8a2b3c';

        const mockToArray = jest.fn().mockResolvedValue([fakeHelicopter]);

        const mockFind = jest.fn().mockReturnValue({
            toArray: mockToArray
        });

        const mockCollection = jest.fn().mockReturnValue({
            find: mockFind
        });

        const mockDb = jest.fn().mockReturnValue({
            collection: mockCollection
        });

        mongodb.getDatabase.mockReturnValue({
            db: mockDb
        });

        await helicopterController.getSingleHelicopter(
            mockRequest,
            mockResponse
        );

        expect(mockCollection).toHaveBeenCalledWith('helicopters');
        expect(mockFind).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakeHelicopter);
        });

  });


  // =========================================================
  // PILOTS
  // =========================================================

  describe('Pilots', () => {

    test('getAllPilots returns 200 and all pilot records', async () => {
      const fakePilots = [
        {
          _id: '652f4c9c1b3d5e001f8a2b3d',
          employeeId: 'EMP-9402',
          firstName: 'Alex',
          lastName: 'Mercer'
        }
      ];

      const mockToArray = jest.fn().mockResolvedValue(fakePilots);
      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray
      });
      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind
      });
      const mockDb = jest.fn().mockReturnValue({
        collection: mockCollection
      });

      mongodb.getDatabase.mockReturnValue({
        db: mockDb
      });

      await pilotController.getAllPilots(
        mockRequest,
        mockResponse
      );

      expect(mockCollection).toHaveBeenCalledWith('pilots');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(fakePilots);
    });


    test('getSinglePilot returns 200 and one pilot record', async () => {
        const fakePilot = {
            _id: '652f4c9c1b3d5e001f8a2b3d',
            employeeId: 'EMP-9402',
            firstName: 'Alex',
            lastName: 'Mercer'
        };

        mockRequest.params.id = '652f4c9c1b3d5e001f8a2b3d';

        // getSinglePilot uses find().toArray()
        const mockToArray = jest.fn().mockResolvedValue([fakePilot]);

        const mockFind = jest.fn().mockReturnValue({
            toArray: mockToArray
        });

        const mockCollection = jest.fn().mockReturnValue({
            find: mockFind
        });

        const mockDb = jest.fn().mockReturnValue({
            collection: mockCollection
        });

        mongodb.getDatabase.mockReturnValue({
            db: mockDb
        });

        await pilotController.getSinglePilot(
            mockRequest,
            mockResponse
        );

        expect(mockCollection).toHaveBeenCalledWith('pilots');

        expect(mockFind).toHaveBeenCalledWith(
            expect.objectContaining({
            _id: expect.any(Object)
            })
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakePilot);
        });

  });


  // =========================================================
  // WEATHER
  // =========================================================

  describe('Weather', () => {

    test('getAllWeather returns 200 and all weather records', async () => {
      const fakeWeather = [
        {
          _id: '652f4c9c1b3d5e001f8a2b3e',
          stationId: 'KSLC',
          flightCategory: 'VFR'
        }
      ];

      const mockToArray = jest.fn().mockResolvedValue(fakeWeather);
      const mockFind = jest.fn().mockReturnValue({
        toArray: mockToArray
      });
      const mockCollection = jest.fn().mockReturnValue({
        find: mockFind
      });
      const mockDb = jest.fn().mockReturnValue({
        collection: mockCollection
      });

      mongodb.getDatabase.mockReturnValue({
        db: mockDb
      });

      await weatherController.getAllWeather(
        mockRequest,
        mockResponse
      );

      expect(mockCollection).toHaveBeenCalledWith('weather');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(fakeWeather);
    });


    test('getSingleWeather returns 200 and one weather record', async () => {
        const fakeWeather = {
            _id: '652f4c9c1b3d5e001f8a2b3e',
            stationId: 'KSLC',
            flightCategory: 'VFR'
        };

        mockRequest.params.id = '652f4c9c1b3d5e001f8a2b3e';

        const mockToArray = jest.fn().mockResolvedValue([fakeWeather]);

        const mockFind = jest.fn().mockReturnValue({
            toArray: mockToArray
        });

        const mockCollection = jest.fn().mockReturnValue({
            find: mockFind
        });

        const mockDb = jest.fn().mockReturnValue({
            collection: mockCollection
        });

        mongodb.getDatabase.mockReturnValue({
            db: mockDb
        });

        await weatherController.getSingleWeather(
            mockRequest,
            mockResponse
        );

        expect(mockCollection).toHaveBeenCalledWith('weather');
        expect(mockFind).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(fakeWeather);
        });

  });

});