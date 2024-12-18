"use client";

import { AddPetModal } from "@/components/modal/AddPetModal";
import { PetList } from "./_components/PetList";
import { usePetProfile } from "@/hooks/usePetProfile";
import { USERNAME } from "@/constants/petProfile";

export default function ProfilePage() {
  const { pets, isModalOpen, handleAddPet, openModal, closeModal } =
    usePetProfile();

  return (
    <div className="max-w-screen">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">{USERNAME}</h1>
        </div>

        <PetList pets={pets} onAddClick={openModal} />

        <AddPetModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAdd={handleAddPet}
        />
      </div>
    </div>
  );
}
