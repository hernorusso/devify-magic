import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { houseMock } from './house-mock';

describe('HousesController', () => {
  let controller: HousesController;
  let service: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [HousesService],
    }).compile();

    controller = module.get<HousesController>(HousesController);
    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get houses', () => {
    const findAllMock = () => {
      return [houseMock];
    };
    jest
      .spyOn(service, 'findAll')
      .mockReturnValue(Promise.resolve([houseMock]));
    const houses = controller.getHouses();
    expect(houses).toStrictEqual([houseMock]);
  });
});
