import Image from "next/image";

interface PetDiaryContentProps {
  generatedDiary: string | null;
  generatedImage: string | null;
}

export function PetDiaryContent({
  generatedDiary,
  generatedImage,
}: PetDiaryContentProps) {
  return (
    <div>
      {generatedDiary ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg min-h-[150px]">
            <p className="whitespace-pre-wrap text-gray-700">
              {generatedDiary}
            </p>
          </div>
          {generatedImage && (
            <div className="w-full h-auto max-h-[400px] relative">
              <Image
                src={generatedImage}
                alt="Generated diary illustration"
                className="rounded-lg object-contain w-full h-full"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  maxHeight: "400px",
                  width: "auto",
                  margin: "0 auto",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            일기를 작성하면 반려동물의 하루가 생성됩니다
          </p>
        </div>
      )}
    </div>
  );
}
