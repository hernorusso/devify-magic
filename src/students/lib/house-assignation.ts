type SkillSet = {
  bravery: number;
  loyalty: number;
  intelligence: number;
  ambition: number;
};

type HousePopulation = {
  gryffindor: number;
  hufflepuff: number;
  ravenclaw: number;
  slytherin: number;
};

export const houseAssignation = (
  skillSet: SkillSet,
  housePopulation: HousePopulation,
) => {
  const assignationCriteria = {
    bravery: 'gryffindor',
    loyalty: 'hufflepuff',
    intelligence: 'ravenclaw',
    ambition: 'slytherin',
  } as const;

  const skills: string[] = [
    'bravery',
    'loyalty',
    'intelligence',
    'ambition',
  ] as const;

  const scores: number[] = skills.map((skill) => skillSet[skill]);
  const highestScore: number = Math.max(...scores);

  const highestRankedSkills: string[] = skills.filter(
    (skill) => skillSet[skill] === highestScore,
  );

  if (highestRankedSkills.length === 1) {
    return assignationCriteria[highestRankedSkills.pop()];
  }

  const houseCandidates: string[] = highestRankedSkills.map(
    (skill) => assignationCriteria[skill],
  );

  const candidatesHousePopulation: number[] = houseCandidates.map(
    (house) => housePopulation[house],
  );

  const minStudentsPerHouse: number = Math.min(...candidatesHousePopulation);

  const lessPopulatedHouseCandidates = houseCandidates.filter(
    (house) => housePopulation[house] === minStudentsPerHouse,
  );

  if (lessPopulatedHouseCandidates.length === 1) {
    return lessPopulatedHouseCandidates.pop();
  }

  const FIRST_ITEM = 0;
  return lessPopulatedHouseCandidates.sort()[FIRST_ITEM];
};
