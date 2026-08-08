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
    // This complete object matches your new strict middleware rules perfectly
    mockRequest.body = {
      stationId: "KSLC",
      assignedAirportId: "652f4c9c1b3d5e001f8a2b3c", // Added the required 24-character hexadecimal database ID string
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
    // This payload fails because stationId is completely omitted
    mockRequest.body = {
      assignedAirportId: "652f4c9c1b3d5e001f8a2b3c", // Included so it passes the ID check but fails the missing stationId rule
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
