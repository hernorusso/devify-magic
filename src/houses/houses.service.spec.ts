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

  it('should return houses', async () => {
    const mockedResult = [houseMock];
    jest.spyOn(repository, 'find').mockResolvedValue(mockedResult);

    const results = await service.find();

    expect(repository.find).toHaveBeenCalled();
    expect(results).toStrictEqual(mockedResult);
  });
});
