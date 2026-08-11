// Import the controller we want to test
const helicopterController = require('../controllers/helicopters');

// 1. Mock the entire database connection module completely
jest.mock('../data/database', () => {
  return {
    getDatabase: jest.fn()
  };
});

// Import the mocked module so we can control its return values dynamically
const mongodb = require('../data/database');

describe('Helicopter Controller Database Mocking Unit Tests', () => {
  let mockRequest;
  let mockResponse;
  let fakeHelicopterArray;

  beforeEach(() => {
    // Reset our request and response structures before every single test
    mockRequest = {};
    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Define the fake mock data that looks like database records
    fakeHelicopterArray = [
      { _id: '652f4c9c1b3d5e001f8a2b3c', make: 'Bell', model: '206', registration: 'N12345' },
      { _id: '652f4c9c1b3d5e001f8a2b3d', make: 'Boeing', model: '747', registration: 'N67890' }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllHelicopters should return 200 and an array of records on success', async () => {
    // 2. Build the nested mock chain to match your code:
    // mongodb.getDatabase().db().collection('helicopters').find().toArray()
    const mockToArray = jest.fn().mockResolvedValue(fakeHelicopterArray);
    const mockFind = jest.fn().mockReturnValue({ toArray: mockToArray });
    const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
    const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
    
    // Wire the complete chain up into our getDatabase mock endpoint
    mongodb.getDatabase.mockReturnValue({ db: mockDb });

    // Execute the controller method
    await helicopterController.getAllHelicopters(mockRequest, mockResponse);

    // 3. Assertions to ensure our controller logic executed perfectly
    expect(mongodb.getDatabase).toHaveBeenCalled();
    expect(mockDb).toHaveBeenCalled();
    expect(mockCollection).toHaveBeenCalledWith('helicopters');
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(fakeHelicopterArray);
  });

  test('getAllHelicopters should return 500 when database throws an error connection crash', async () => {
    // Force the database chain to throw an error object instantly
    const mockDb = jest.fn().mockImplementation(() => {
      throw new Error('Database connection timed out');
    });
    
    mongodb.getDatabase.mockReturnValue({ db: mockDb });

    // Execute the controller method
    await helicopterController.getAllHelicopters(mockRequest, mockResponse);

    // Assert that the controller accurately caught the thrown error and returned a 500 status
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Database connection timed out'
    });
  });
});
