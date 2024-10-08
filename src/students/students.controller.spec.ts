import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { idMock, studentDataMock, studentMock } from './student-mock';

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

  describe('Create a Student', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('Should call the create method on service with the provided data', () => {
      jest.spyOn(serviceMock, 'create');

      controller.create(studentDataMock);

      expect(serviceMock.create).toHaveBeenCalledWith(studentDataMock);
    });

    it('should return the created Student', async () => {
      jest.spyOn(serviceMock, 'create').mockResolvedValue(studentMock);

      const result = await controller.create(studentDataMock);

      expect(result).toEqual(studentMock);
    });
  });

  describe('Get a single Student', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should call to the service layer', () => {
      jest.spyOn(serviceMock, 'findOne');

      controller.findOne(idMock);

      expect(serviceMock.findOne).toHaveBeenCalledWith(idMock);
    });

    it('should return a student', () => {
      jest.spyOn(serviceMock, 'findOne').mockResolvedValue(studentMock);

      expect(controller.findOne(idMock)).resolves.toEqual(studentMock);
    });
  });

  describe('Update a student by id', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call the service layer', () => {
      jest.spyOn(serviceMock, 'update');

      controller.update(idMock, studentDataMock);

      expect(serviceMock.update).toHaveBeenCalledWith(idMock, studentDataMock);
    });

    it('should return the updated student', () => {
      jest.spyOn(serviceMock, 'update').mockResolvedValue(studentMock);
      expect(controller.update(idMock, studentDataMock)).resolves.toEqual(
        studentMock,
      );
    });
  });

  describe('Delete a Student', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should call the service layer', () => {
      jest.spyOn(serviceMock, 'remove');

      controller.remove(idMock);

      expect(serviceMock.remove).toHaveBeenCalledWith(idMock);
    });
  });
});
