import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import {
  idMock,
  studentDataMock,
  studentExceptionMock,
  studentMock,
} from './student-mock';
import { DeleteResult } from 'typeorm';
import { ConflictException } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  let repositoryMock;

  const repositoryMockFactory = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    repositoryMock = repositoryMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: getRepositoryToken(Student), useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get all students', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should call the repository layer', () => {
      jest.spyOn(repositoryMock, 'find');

      service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled();
    });

    it('should return a collection of students', async () => {
      const resultMock = [studentMock];
      jest.spyOn(repositoryMock, 'find').mockResolvedValue(resultMock);

      const result = await service.findAll();

      expect(result).toEqual(resultMock);
    });
  });

  describe('Get a single student', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should call the repository layer', () => {
      const repositoryCallMock = {
        where: { id: idMock },
        relations: { house: true },
      };
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(studentMock);

      service.findOne(idMock);

      expect(repositoryMock.findOne).toHaveBeenCalledWith(repositoryCallMock);
    });

    it('Should return a single student', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(studentMock);

      const result = await service.findOne(idMock);

      expect(result).toEqual(studentMock);
    });

    it('should throw 404 not found if the requested student does not exist', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne(idMock);
      } catch (err) {
        expect(err.response).toEqual(studentExceptionMock);
      }
    });
  });

  describe('Create a Student', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should create a new Student Object', () => {
      jest.spyOn(repositoryMock, 'create');

      service.create(studentDataMock);

      expect(repositoryMock.create).toHaveBeenCalled();
    });

    it('should save the created Student', async () => {
      jest.spyOn(repositoryMock, 'save');

      await service.create(studentDataMock);

      expect(repositoryMock.save).toHaveBeenCalled();
    });

    it('Should return the created user', async () => {
      const createdSTudent = { ...studentMock, house: null };
      jest.spyOn(repositoryMock, 'save').mockReturnValue(createdSTudent);
      const result = await service.create(studentDataMock);
      expect(result).toEqual(createdSTudent);
    });

    it('Should handle an internal server error gracefully', () => {
      jest
        .spyOn(repositoryMock, 'save')
        .mockRejectedValue(new Error('Internal server error'));

      expect(service.create(studentDataMock)).rejects.toThrow(
        new ConflictException(),
      );
    });
  });

  describe('Update a Student', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should get the student to update', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(studentMock);

      jest.spyOn(service, 'findOne');
      await service.update(idMock, studentDataMock);

      expect(service.findOne).toHaveBeenCalledWith(idMock);
    });

    it('Should update and return the selected student', async () => {
      const updatedStudentData = { ...studentDataMock, age: 15, bravery: 4 };
      const updatedStudentMock = { ...studentMock, ...updatedStudentData };
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(studentMock);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(updatedStudentMock);

      const result = await service.update(idMock, updatedStudentData);

      expect(repositoryMock.save).toHaveBeenCalledWith(updatedStudentMock);
      expect(result).toEqual(updatedStudentMock);
    });

    it('Should raise and exception is the requested student does not exist', async () => {
      const updatedStudentData = { ...studentDataMock, age: 15, bravery: 4 };
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

      try {
        await service.update(idMock, updatedStudentData);
      } catch (err) {
        expect(err.response).toEqual(studentExceptionMock);
      }
    });
  });

  describe('Remove a Student', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('Should call the repository layer with specific Student id', () => {
      const resultMock: DeleteResult = { affected: 1, raw: '' };
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue(resultMock);

      service.remove(idMock);

      expect(repositoryMock.delete).toHaveBeenCalledWith(idMock);
    });

    it('should return undefined if student has been deleted', async () => {
      const resultMock: DeleteResult = { affected: 1, raw: '' };
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue(resultMock);

      const result = await service.remove(idMock);

      expect(result).toEqual(undefined);
    });

    it('should raise and exception if the Student is not found', async () => {
      const resultMock: DeleteResult = { affected: 0, raw: '' };
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue(resultMock);

      try {
        await service.remove(idMock);
      } catch (err) {
        expect(err.response).toEqual(studentExceptionMock);
      }
    });
  });
});
