import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PetCard } from "./PetCard";
import { Pet } from "@/types/pet.types";

interface PetListProps {
  pets: Pet[];
  onAddClick: () => void;
}

export function PetList({ pets, onAddClick }: PetListProps) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">반려동물 정보</h2>
      <div className="space-y-4">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6 border-dashed"
          onClick={onAddClick}>
          <Plus className="w-5 h-5" />
          추가하기
        </Button>
      </div>
    </div>
  );
}
