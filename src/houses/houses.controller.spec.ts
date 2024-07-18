import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { houseExceptionMock, houseMock, houseNameMDtoMock } from './house-mock';

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
    const mockedResult = [houseMock];

    it('should be defined', () => {
      expect(controller.getHouses).toBeDefined();
    });

    it('should call to the related service', async () => {
      jest.spyOn(service, 'find').mockResolvedValue(mockedResult);

      await controller.getHouses();

      expect(service.find).toHaveBeenCalled();
    });

    it('should return houses', async () => {
      jest.spyOn(service, 'find').mockResolvedValue(mockedResult);

      const result = await controller.getHouses();

      expect(service.find).toHaveBeenCalled();
      expect(result).toStrictEqual(mockedResult);
    });
  });

  describe('Handle get house by name', () => {
    it('should be defined', () => {
      expect(controller.getHouseByName).toBeDefined();
    });

    it('should call to the related service', async () => {
      jest.spyOn(service, 'findOneByName');

      await controller.getHouseByName(houseNameMDtoMock);

      expect(service.findOneByName).toHaveBeenCalled();
    });

    it('should return the a single house', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValue(houseMock);

      const result = await controller.getHouseByName(houseNameMDtoMock);

      expect(result).toEqual(houseMock);
    });

    it('Should bubble up Not found service exceptions', async () => {
      const { message } = houseExceptionMock;
      jest.spyOn(service, 'findOneByName').mockImplementation(() => {
        throw new NotFoundException(message);
      });

      try {
        await controller.getHouseByName(houseNameMDtoMock);
      } catch (err) {
        expect(err.response).toEqual(houseExceptionMock);
      }
    });
  });
});
