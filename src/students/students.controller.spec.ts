import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { studentMock } from './student-mock';

describe('StudentsController', () => {
  let controller: StudentsController;
  let serviceMock;
  const serviceMockFactory = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  });

  beforeEach(async () => {
    serviceMock = serviceMockFactory();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [{ provide: StudentsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all students', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should call the findAll service method', async () => {
      jest.spyOn(serviceMock, 'findAll').mockResolvedValue([studentMock]);

      await controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalled();
    });

    it('should return a list of students', async () => {
      jest.spyOn(serviceMock, 'findAll').mockResolvedValue([studentMock]);

      const result = await controller.findAll();

      expect(result).toEqual([studentMock]);
    });
  });
});
