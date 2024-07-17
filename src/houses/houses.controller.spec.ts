import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { houseMock } from './house-mock';

describe('HousesController', () => {
  let controller: HousesController;
  let service: HousesService;

  const houseServiceMockFactory = () => ({
    find: jest.fn(),
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

  it('should get houses', async () => {
    const mockedResult = [houseMock];
    jest.spyOn(service, 'find').mockResolvedValue(mockedResult);

    const houses = await controller.getHouses();

    expect(service.find).toHaveBeenCalled();
    expect(houses).toStrictEqual([houseMock]);
  });
});
