import { houseAssignation } from './house-assignation';

describe('Assignation Algorithm', () => {
  const housePopulation = {
    gryffindor: 11,
    hufflepuff: 11,
    ravenclaw: 7,
    slytherin: 5,
  };
  it('Should return a house name, according to best student skill', () => {
    const skillSet = { bravery: 5, loyalty: 1, intelligence: 3, ambition: 3 };
    const expectedHouseAssignment = 'gryffindor';

    const houseAssignment = houseAssignation(skillSet, housePopulation);

    expect(houseAssignment).toBe(expectedHouseAssignment);
  });

  it('Student with highest score in several skills should be assign to the house with less students', () => {
    const skillSet = { bravery: 4, loyalty: 5, intelligence: 5, ambition: 3 };
    const expectedHouseAssignment = 'ravenclaw';

    const houseAssignment = houseAssignation(skillSet, housePopulation);

    expect(houseAssignment).toBe(expectedHouseAssignment);
  });

  it('If all the above assumption cannot define a proper house, will assign a house by alphabetical order', () => {
    const skillSet = { bravery: 5, loyalty: 5, intelligence: 4, ambition: 1 };
    const expectedHouseAssignment = 'gryffindor';

    const houseAssignment = houseAssignation(skillSet, housePopulation);

    expect(houseAssignment).toBe(expectedHouseAssignment);
  });
});
