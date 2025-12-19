import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageAnalysisTab } from "./ImageAnalysisTab";
import { IngredientRecognitionTab } from "./IngredientRecognitionTab";
import { ImageCreatorTab } from "./ImageCreatorTab";

export function Body() {
  return (
    <div className="flex px-45 justify-center items-start gap-20 flex-1 self-stretch">
      <div className="flex w-145 py-6 flex-col items-start gap-6 self-stretch">
        <Tabs defaultValue="Image analysis">
          <TabsList>
            <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
            <TabsTrigger value="Ingredient recognition">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="Image creator">Image creator</TabsTrigger>
          </TabsList>
          <ImageAnalysisTab />
          <IngredientRecognitionTab />
          <ImageCreatorTab />
        </Tabs>
      </div>
    </div>
  );
}
