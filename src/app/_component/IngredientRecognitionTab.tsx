"use client";
import { FileTextIcon, RefreshCwIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { TextGenerationFormData } from "../FormData/TextGenerationFormData";
import ReactMarkdown from "react-markdown";

export function IngredientRecognitionTab() {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const handleReset = () => {
    if (textInput) {
      setGeneratedText(null);
    }
    setTextInput("");
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleGenerate = async () => {
    setLoading(true);
    if (!textInput.trim()) {
      alert("Please enter a description");
      setLoading(false);
      return;
    }
    try {
      const createresult = await TextGenerationFormData(textInput);
      console.log("Text generation result:", createresult);

      setGeneratedText(createresult.generatedText);
    } catch (err) {
      console.error("Error generating text:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TabsContent value="Ingredient recognition">
      <Card className="w-145">
        <CardHeader>
          <CardTitle className="text-[#09090B] font-inter text-xl font-semibold leading-7 tracking-normal flex gap-2 justify-between">
            <div className="flex gap-2">
              <SparklesIcon className="w-6 h-6" /> Text Generation
            </div>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCwIcon />
            </Button>
          </CardTitle>
          <CardDescription>
            Describe the food, and AI will detect the ingredients.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <textarea
              className="flex h-31 p-2 px-3 items-start self-stretch rounded-md border border-[#E4E4E7] bg-white"
              placeholder="Орц тодорхойлох"
              value={textInput}
              onChange={handleTextChange}
              disabled={loading}
            />
          </div>
          <div className=" flex justify-end">
            <Button size="sm" onClick={handleGenerate} disabled={loading}>
              Generate
            </Button>
          </div>

          <p className="flex gap-2 text-black font-inter text-xl font-semibold leading-6 tracking-normal">
            <FileTextIcon />
            Identified Ingredients
          </p>
          {!generatedText ? (
            <p className="text-zinc-500 text-sm">
              First, enter your text to generate text.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg overflow-hidden border bg-zinc-50 prose prose-sm max-w-none">
                <ReactMarkdown>{generatedText}</ReactMarkdown>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
