import { INITIAL_PETS } from "@/constants/petProfile";
import { NewPet, Pet } from "@/types/pet.types";
import { useState } from "react";

export function usePetProfile() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPet = (newPet: NewPet) => {
    setPets((prev) => [...prev, { ...newPet, id: prev.length + 1 }]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    pets,
    isModalOpen,
    handleAddPet,
    openModal,
    closeModal,
  };
}
