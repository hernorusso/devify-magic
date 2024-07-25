type SkillSet = {
  [key: string]: number;
};

export type HousePopulation = {
  [key: string]: number;
};

// TODO: Refactor this to a class. It should get a student and a population object
export const houseAssignation = (
  skillSet: SkillSet,
  housePopulation: HousePopulation,
) => {
  // TODO: Make this criteria Dynamic: get it from the DB
  // TODO: Also there is a typo: griff should be gryff
  const assignationCriteria = {
    bravery: 'griff',
    loyalty: 'huffle',
    intelligence: 'raven',
    ambition: 'slyth',
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

  console.log(lessPopulatedHouseCandidates);
  const FIRST_ITEM = 0;
  return lessPopulatedHouseCandidates.sort()[FIRST_ITEM];
};
