import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HousesService } from './houses.service';
import {
  houseExceptionMock,
  houseMock,
  houseNameMock,
  houseWithStudentsMock,
} from './house-mock';
import { House } from './entities/house.entity';
import { studentMock } from 'src/students/student-mock';
import { NotFoundException } from '@nestjs/common';

describe('HousesService', () => {
  let service: HousesService;
  let repository;

  const mockRepositoryFactory = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    repository = mockRepositoryFactory();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousesService,
        {
          provide: getRepositoryToken(House),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get Houses', () => {
    it('should return all houses', async () => {
      const mockedResult = [houseMock];
      jest.spyOn(repository, 'find').mockResolvedValue(mockedResult);

      const results = await service.find();

      expect(repository.find).toHaveBeenCalled();
      expect(results).toStrictEqual(mockedResult);
    });
  });

  describe('Get a House by name', () => {
    it('should be defined', () => {
      expect(service.findOneByName).toBeDefined();
    });

    it('should call the repository layer', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(houseMock);
      await service.findOneByName(houseNameMock);
      expect(repository.findOneBy).toHaveBeenCalled();
    });

    it('should return a house by name', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(houseMock);

      const result = await service.findOneByName(houseNameMock);

      expect(result).toBe(houseMock);
    });

    it('should throw 404 not found if the requested house does not exist', async () => {
      const houseName = 'hogwarts';
      houseExceptionMock.message = `The request house: ${houseName} is not found!`;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.findOneByName(houseName);
      } catch (err) {
        expect(err.response).toEqual(houseExceptionMock);
      }
    });
  });

  describe('Get all the students in a house', () => {
    it('should be defined', () => {
      expect(service.findStudentsByHouse).toBeDefined();
    });
    it('should call the repository layer', () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue([studentMock]);

      service.findStudentsByHouse(houseNameMock);

      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should return a list of students', async () => {
      const studentJoinHouseMock = {
        ...studentMock,
        house: houseMock,
      };
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(houseWithStudentsMock);

      const result = await service.findStudentsByHouse(houseNameMock);

      expect(result).toEqual([studentJoinHouseMock]);
    });

    it('should raise an exception is house name does not exist', () => {
      const message = `The house ${houseNameMock} is not found`;
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(service.findStudentsByHouse(houseNameMock)).rejects.toThrow(
        new NotFoundException(message),
      );
    });
  });
});
