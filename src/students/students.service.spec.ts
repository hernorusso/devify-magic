import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { studentMock } from './student-mock';

describe('StudentsService', () => {
  let service: StudentsService;
  let repositoryMock;

  const repositoryMockFactory = () => ({
    find: jest.fn(),
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

  describe('Should get all students', () => {
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
});
