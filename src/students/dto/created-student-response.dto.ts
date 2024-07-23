export class CreateStudentResponseDto {
  id: string;
  name: string;
  age: number;
  bravery: number;
  loyalty: number;
  intelligence: number;
  ambition: number;
}

// TODO: This DTO is only been capture by swagger. Later on it should be enforced by interceptors.
