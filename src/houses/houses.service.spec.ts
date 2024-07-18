import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HousesService } from './houses.service';
import { houseExceptionMock, houseMock, houseNameMDtoMock } from './house-mock';
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
      await service.findOneByName(houseNameMDtoMock);
      expect(repository.findOneBy).toHaveBeenCalled();
    });

    it('should return a house by name', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(houseMock);

      const result = await service.findOneByName(houseNameMDtoMock);

      expect(result).toBe(houseMock);
    });

    it('should throw 404 not found if the requested house does not exist', async () => {
      const houseName = 'hogwarts';
      houseExceptionMock.message = `The request house: ${houseName} is not found!`;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.findOneByName(houseNameMDtoMock);
      } catch (err) {
        expect(err.response).toEqual(houseExceptionMock);
      }
    });
  });
});
