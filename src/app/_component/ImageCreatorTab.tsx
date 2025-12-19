"use client";
import { ImageIcon, RotateCw, SparklesIcon } from "lucide-react";
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
import { ImageCreatorFormData } from "../FormData/ImageCreatorFormData";
import Image from "next/image";

export function ImageCreatorTab() {
  const [text, setText] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = () => {
    setText("");
    setGeneratedImageUrl(null);
    setLoading(false);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerate = async () => {
    setLoading(true);
    if (!text.trim()) {
      alert("Please enter a description");
      setLoading(false);
      return;
    }
    try {
      const createresult = await ImageCreatorFormData(text);
      console.log("Image creation result:", createresult);

      if (
        createresult.success &&
        createresult.images &&
        createresult.images.length > 0
      ) {
        // Зургийн URL эсвэл base64 авах
        const imageUrl = createresult.images || createresult.images[0];
        setGeneratedImageUrl(imageUrl);
        console.log("Generated Image URL:", imageUrl);
      }
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="Image creator">
      <Card className="w-145">
        <CardHeader>
          <CardTitle className="text-[#09090B] font-inter text-xl font-semibold leading-7 tracking-normal flex gap-2 justify-between">
            <div className="flex gap-2">
              <SparklesIcon className="w-6 h-6" /> Food image creator
            </div>
            <Button variant="outline" onClick={handleReset} disabled={loading}>
              <RotateCw className="text-gray-400" />
            </Button>
          </CardTitle>
          <CardDescription>
            What food image do you want? Describe it briefly.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <textarea
              className="flex h-31 p-2 px-3 items-start self-stretch rounded-md border border-[#E4E4E7] bg-white"
              placeholder="Хоолны тайлбар"
              value={text}
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
            <ImageIcon /> Result
          </p>

          {!generatedImageUrl ? (
            <p className="text-zinc-500 text-sm">
              First, enter your text to generate an image.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg overflow-hidden border bg-zinc-50">
                <Image
                  src={generatedImageUrl}
                  alt="Generated food"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-zinc-600">
                Generated based on: {text}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
