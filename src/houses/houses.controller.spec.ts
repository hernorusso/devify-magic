import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { houseExceptionMock, houseMock, houseNameMock } from './house-mock';
import { studentMock } from 'src/students/student-mock';
import { StudentResponseDto } from 'src/students/dto/response-student.dto';

describe('HousesController', () => {
  let controller: HousesController;
  let service: HousesService;

  const houseServiceMockFactory = () => ({
    find: jest.fn(),
    findOneByName: jest.fn(),
    findStudentsByHouse: jest.fn(),
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

      await controller.getHouseByName(houseNameMock);

      expect(service.findOneByName).toHaveBeenCalled();
    });

    it('should return the a single house', async () => {
      jest.spyOn(service, 'findOneByName').mockResolvedValue(houseMock);

      const result = await controller.getHouseByName(houseNameMock);

      expect(result).toEqual(houseMock);
    });

    it('Should bubble up Not found service exceptions', async () => {
      const { message } = houseExceptionMock;
      jest.spyOn(service, 'findOneByName').mockImplementation(() => {
        throw new NotFoundException(message);
      });

      try {
        await controller.getHouseByName(houseNameMock);
      } catch (err) {
        expect(err.response).toEqual(houseExceptionMock);
      }
    });
  });

  describe('Get Students by house name', () => {
    it('should be defined', () => {
      expect(controller.getStudentsByHouseName).toBeDefined();
    });

    it('should call the service layer', () => {
      const result = {
        ...studentMock,
        house: houseMock,
      };
      jest.spyOn(service, 'findStudentsByHouse').mockResolvedValue([result]);

      controller.getStudentsByHouseName(houseNameMock);

      expect(service.findStudentsByHouse).toHaveBeenCalledWith(houseNameMock);
    });

    it('should return a list of students', () => {
      const resultMock = {
        ...studentMock,
        house: houseMock,
      };
      jest
        .spyOn(service, 'findStudentsByHouse')
        .mockResolvedValue([resultMock]);

      expect(controller.getStudentsByHouseName(houseNameMock)).resolves.toEqual(
        [resultMock],
      );
    });
  });
});
