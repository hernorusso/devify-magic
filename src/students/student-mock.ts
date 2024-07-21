const houseNameMock = 'Ravenclaw';

export const idMock = 'some-unique-id-string';

const studentNameMock = 'harry';

export const studentDataMock = {
  name: studentNameMock,
  age: 14,
  bravery: 3,
  loyalty: 3,
  intelligence: 3,
  ambition: 3,
};

export const studentMock = {
  id: idMock,
  house: houseNameMock,
  ...studentDataMock,
};

export const studentExceptionMock = {
  message: `The student with id: ${idMock} is not found!`,
  error: 'Not Found',
  statusCode: 404,
};
