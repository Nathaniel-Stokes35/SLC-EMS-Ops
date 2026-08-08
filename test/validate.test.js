const { saveWeather } = require('../middleware/validate');

describe('Weather Validation Middleware Unit Tests', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    // Clear out mocks before every single test run
    mockRequest = { body: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    nextFunction = jest.fn();
  });

  test('should pass validation and call next() when weather payload is valid', () => {
    mockRequest.body = {
      stationId: "KSLC",
      windSpeedKnots: 15,
      windDirectionDegrees: 240,
      visibilityMiles: 10,
      flightCategory: "VFR"
    };

    saveWeather(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should fail validation with 412 status when missing stationId', () => {
    mockRequest.body = {
      windSpeedKnots: 15,
      windDirectionDegrees: 240,
      visibilityMiles: 10,
      flightCategory: "VFR"
    };

    saveWeather(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(412);
    expect(mockResponse.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Validation failed' })
    );
  });
});
