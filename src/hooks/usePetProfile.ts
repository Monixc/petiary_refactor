import { useEffect, useState } from "react";
import { createPet, getPets } from "@/lib/db/pet";
import { Pet } from "@/types/pet.types";

export function usePetProfile() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { sub } = JSON.parse(userInfo);
      setUserId(sub);
      loadPets(sub);
    }
  }, []);

  const loadPets = async (id: string) => {
    try {
      const response = await getPets(id);
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

  const handleAddPet = async (pet: any) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated");
      }
      await createPet(userId, pet);
      await loadPets(userId);
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
