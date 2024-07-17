import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { houseMock } from './house-mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { House } from './house.entity';

describe('HousesService', () => {
  let service: HousesService;
  let repository;

  const mockRepositoryFactory = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
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
      await service.findOneByName('name');
      expect(repository.findOneBy).toHaveBeenCalled();
    });

    it('should return a house by name', async () => {
      const mockedResult = houseMock;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockedResult);

      const result = await service.findOneByName('name');

      expect(result).toBe(mockedResult);
    });

    it('should throw 404 not found if the requested house does not exist', async () => {
      const houseName = 'hogwarts';
      const mockedResult = {
        message: `The request house: ${houseName} is not found!`,
        error: 'Not Found',
        statusCode: 404,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.findOneByName(houseName);
      } catch (err) {
        expect(err.response).toEqual(mockedResult);
      }
    });
  });
});
