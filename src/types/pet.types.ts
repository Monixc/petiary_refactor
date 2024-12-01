export interface Pet {
  id: number;
  name: string;
  age: number;
  species: string;
  imageUrl: string;
  gender?: "MALE" | "FEMALE";
  personality?: string;
}

export type NewPet = Omit<Pet, "id">;
