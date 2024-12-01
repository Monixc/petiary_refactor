import { Pet } from "@/types/pet.types";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <div className="relative w-12 h-12 flex-shrink-0">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>이름: {pet.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>나이: {pet.age}살</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>종류: {pet.species}</span>
        </div>
      </div>
    </div>
  );
}
