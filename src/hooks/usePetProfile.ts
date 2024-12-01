import { useEffect, useState } from "react";
import { createPet, getPets } from "@/lib/db/pet";
import { useAuth } from "@/contexts/AuthContext";
import { Pet } from "@/types/pet.types";

export function usePetProfile() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.sub) {
      loadPets();
    }
  }, [user]);

  const loadPets = async () => {
    try {
      const response = await getPets(user.sub);
      const mappedPets = (response.Items || []).map((item) => ({
        id: item.petId,
        name: item.name,
        age: item.age,
        species: item.species,
        imageUrl: item.imageUrl,
        gender: item.gender,
        personality: item.personality,
      }));
      setPets(mappedPets);
    } catch (error) {
      console.error("Failed to load pets:", error);
    }
  };

  const handleAddPet = async (newPet: any) => {
    try {
      await createPet(user.sub, newPet);
      await loadPets();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  return {
    pets,
    isModalOpen,
    handleAddPet,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
}
