// Import the controller we want to test
const weatherController = require('../controllers/weather');

// 1. Mock the entire database connection module completely
jest.mock('../data/database', () => {
  return {
    getDatabase: jest.fn()
  };
});

// Import the mocked module so we can control its return values dynamically
const mongodb = require('../data/database');

describe('Weather Controller Database Mocking Unit Tests', () => {
  let mockRequest;
  let mockResponse;
  let fakeWeatherArray;

  beforeEach(() => {
    // Reset our request and response structures before every single test
    mockRequest = {};
    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Define the fake mock data that looks like database records
    fakeWeatherArray = [
      { _id: '652f4c9c1b3d5e001f8a2b3c', stationId: 'KSLC', flightCategory: 'VFR' },
      { _id: '652f4c9c1b3d5e001f8a2b3d', stationId: 'KPVU', flightCategory: 'IFR' }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllWeather should return 200 and an array of records on success', async () => {
    // 2. Build the nested mock chain to match your code:
    // mongodb.getDatabase().db().collection('weather').find().toArray()
    const mockToArray = jest.fn().mockResolvedValue(fakeWeatherArray);
    const mockFind = jest.fn().mockReturnValue({ toArray: mockToArray });
    const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
    const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
    
    // Wire the complete chain up into our getDatabase mock endpoint
    mongodb.getDatabase.mockReturnValue({ db: mockDb });

    // Execute the controller method
    await weatherController.getAllWeather(mockRequest, mockResponse);

    // 3. Assertions to ensure our controller logic executed perfectly
    expect(mongodb.getDatabase).toHaveBeenCalled();
    expect(mockDb).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('weather');
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeWeatherArray);
  });

  test('getAllWeather should return 500 when database throws an error connection crash', async () => {
    // Force the database chain to throw an error object instantly
    const mockDb = jest.fn().mockImplementation(() => {
      throw new Error('Database connection timed out');
    });
    
    mongodb.getDatabase.mockReturnValue({ db: mockDb });

    // Execute the controller method
    await weatherController.getAllWeather(mockRequest, mockResponse);

    // Assert that the controller accurately caught the thrown error and returned a 500 status
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Database connection timed out'
    });
  });
});
