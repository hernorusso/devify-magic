import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';

const houseMock = {
  name: 'houseName',
  motto: 'houseMotto',
  headOfHouse: 'houseHead',
};

describe('HousesService', () => {
  let service: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousesService],
    }).compile();

    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return houses', () => {
    const results = service.findAll();
    expect(results).toStrictEqual([houseMock]);
  });
});
