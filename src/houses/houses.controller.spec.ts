import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { houseMock } from './house-mock';
import { NotFoundException } from '@nestjs/common';

describe('HousesController', () => {
  let controller: HousesController;
  let service: HousesService;

  const houseServiceMockFactory = () => ({
    find: jest.fn(),
    findOneByName: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [
        { provide: HousesService, useFactory: houseServiceMockFactory },
      ],
    }).compile();

    controller = module.get<HousesController>(HousesController);
    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Handle Get all houses', () => {
    it('should be defined', () => {
      expect(controller.getHouses).toBeDefined();
    });
    it('should call to the related service', async () => {
      const mockedResult = [houseMock];
      jest.spyOn(service, 'find').mockResolvedValue(mockedResult);

      await controller.getHouses();

      expect(service.find).toHaveBeenCalled();
    });

    it('should return houses', async () => {
      const mockedResult = [houseMock];
      jest.spyOn(service, 'find').mockResolvedValue(mockedResult);

      const houses = await controller.getHouses();

      expect(service.find).toHaveBeenCalled();
      expect(houses).toStrictEqual([houseMock]);
    });
  });

  describe('Handle get house by name', () => {
    it('should be defined', () => {
      expect(controller.getHouseByName).toBeDefined();
    });

    it('should call to the related service', async () => {
      const houseName = 'hogwarts';
      jest.spyOn(service, 'findOneByName');

      await controller.getHouseByName(houseName);

      expect(service.findOneByName).toHaveBeenCalled();
    });

    it('should return the a single house', async () => {
      const houseName = 'hogwarts';
      jest.spyOn(service, 'findOneByName').mockResolvedValue(houseMock);

      const result = await controller.getHouseByName(houseName);

      expect(result).toEqual(houseMock);
    });

    it('Should bubble up Not found service exceptions', async () => {
      const message = 'Test Exception';
      const mockedException = {
        message,
        error: 'Not Found',
        statusCode: 404,
      };
      jest.spyOn(service, 'findOneByName').mockImplementation(() => {
        throw new NotFoundException(message);
      });

      try {
        await controller.getHouseByName('houseName');
      } catch (err) {
        expect(err.response).toEqual(mockedException);
      }
    });
  });
});
