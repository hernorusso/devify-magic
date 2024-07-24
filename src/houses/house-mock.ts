import { studentMock } from 'src/students/student-mock';

export const houseNameMock = 'houseName';
export const houseMock = {
  name: houseNameMock,
  motto: 'houseMotto',
  headOfHouse: 'houseHead',
  students: [],
};

export const houseNameMDtoMock = { name: 'hogwarts' };

export const houseExceptionMock = {
  message: `The request house: myHouse is not found!`,
  error: 'Not Found',
  statusCode: 404,
};

export const houseWithStudentsMock = {
  ...houseMock,
  students: [
    {
      ...studentMock,
      house: { ...houseMock },
    },
  ],
};
