import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (pet: {
    name: string;
    age: number;
    species: string;
    imageUrl: string;
    gender: "MALE" | "FEMALE";
    personality: string;
  }) => void;
}

export function AddPetModal({ isOpen, onClose, onAdd }: AddPetModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [personality, setPersonality] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      name,
      age: parseInt(age),
      species,
      imageUrl,
      gender,
      personality,
    });

    // 입력 필드 초기화
    setName("");
    setAge("");
    setSpecies("");
    setImageUrl("");
    setGender("MALE");
    setPersonality("");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[96vh] p-0 overflow-hidden rounded-t-[20px]">
        <div className="mx-auto my-3 h-1.5 w-12 rounded-full bg-gray-300/80" />

        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle>반려동물 추가</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[calc(96vh-80px)]">
          <div className="flex-1 space-y-6 p-4 overflow-y-auto pb-24">
            <div>
              <label className="text-sm font-medium block mb-1.5">
                프로필 사진
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                <ImageUpload onUploadComplete={setImageUrl} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">이름</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="반려동물의 이름을 입력하세요"
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">성별</label>
              <RadioGroup
                value={gender}
                onValueChange={(v) => setGender(v as "MALE" | "FEMALE")}
                className="flex gap-6">
                <div className="flex-1">
                  <RadioGroupItem
                    value="MALE"
                    id="male"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="male"
                    className="flex h-12 items-center justify-center rounded-md border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary">
                    남아
                  </Label>
                </div>
                <div className="flex-1">
                  <RadioGroupItem
                    value="FEMALE"
                    id="female"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="female"
                    className="flex h-12 items-center justify-center rounded-md border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary">
                    여아
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">나이</label>
              <Input
                required
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="나이를 입력하세요"
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">종류</label>
              <Input
                required
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="반려동물의 종류를 입력하세요"
                className="h-12"
              />
            </div>

            <div className="mb-20">
              <label className="text-sm font-medium block mb-1.5">성격</label>
              <Input
                required
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="반려동물의 성격을 입력하세요"
                className="h-12"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl"
              disabled={!name || !age || !species || !imageUrl || !personality}>
              추가하기
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
