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

describe('StudentsService', () => {
  let service: StudentsService;
  let repositoryMock;

  const repositoryMockFactory = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
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
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(studentMock);

      service.findOne(idMock);

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: idMock });
    });

    it('Should return a single student', async () => {
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(studentMock);

      const result = await service.findOne(idMock);

      expect(result).toEqual(studentMock);
    });

    it('should throw 404 not found if the requested student does not exist', async () => {
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(null);

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
  });

  describe('Update a Student', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should get the student to update', async () => {
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(studentMock);

      jest.spyOn(service, 'findOne');
      await service.update(idMock, studentDataMock);

      expect(service.findOne).toHaveBeenCalledWith(idMock);
    });

    it('Should update and return the selected student', async () => {
      const updatedStudentData = { ...studentDataMock, age: 15, bravery: 4 };
      const updatedStudentMock = { ...studentMock, ...updatedStudentData };
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(studentMock);
      jest.spyOn(repositoryMock, 'save').mockResolvedValue(updatedStudentMock);

      const result = await service.update(idMock, updatedStudentData);

      expect(repositoryMock.save).toHaveBeenCalledWith(updatedStudentMock);
      expect(result).toEqual(updatedStudentMock);
    });

    it('Should raise and exception is the requested student does not exist', async () => {
      const updatedStudentData = { ...studentDataMock, age: 15, bravery: 4 };
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(null);

      try {
        await service.update(idMock, updatedStudentData);
      } catch (err) {
        expect(err.response).toEqual(studentExceptionMock);
      }
    });
  });
});
