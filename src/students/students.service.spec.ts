import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { idMock, studentExceptionMock, studentMock } from './student-mock';

describe('StudentsService', () => {
  let service: StudentsService;
  let repositoryMock;

  const repositoryMockFactory = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
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
});
