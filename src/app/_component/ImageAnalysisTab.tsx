"use client";
import {
  FileTextIcon,
  Loader,
  
  RotateCw,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageAnalysisFormData } from "../FormData/ImageAnalysisFormData";

type TypingTextProps = {
  text: string;
  speed?: number;
};

export function TypingText({ text, speed = 20 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="whitespace-pre-wrap">{displayed}</p>;
}

export function ImageAnalysisTab() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState({ reason: "", content: "" });

  const getFirstSentence = (text?: string) => {
    if (!text) return "";
    // undefined гэсэн үгийг болон утгагүй хэсгүүдийг арилгана
    const cleaned = text
      .replace(/undefined/gi, "")
      .replace(/\s+/g, " ") // олон хоосон зайг нэг болгоно
      .trim();

    if (!cleaned) return "";

    const firstSentence = cleaned.split(".")[0].trim();
    return firstSentence ? firstSentence + "." : "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleGenerate = async () => {
    if (loading) return;
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }
    setLoading(true);
    try {
      const analysisResult = await ImageAnalysisFormData(selectedFile);

      console.log("Image analysis result:", analysisResult);

      setResult({
        reason: analysisResult.data.message.reasoning_content,
        content: analysisResult.data.message.content,
      });
    } catch (error) {
      console.error("Error during image analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  };
  // console.log("Result content:", result.content);
  return (
    <TabsContent value="Image analysis">
      <Card className="w-145 ">
        <CardHeader>
          <CardTitle className="text-[#09090B] font-inter text-xl font-semibold leading-7 tracking-normal flex gap-2 justify-between">
            <div className="flex gap-2">
              <SparklesIcon className="w-6 h-6" /> Image analysis
            </div>
            <Button variant="outline" onClick={handleReset}>
              <RotateCw className="text-gray-400" />
            </Button>
          </CardTitle>
          <CardDescription>
            Upload a food photo, and AI will detect the ingredients.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Input
              type="file"
              placeholder="JPG , PNG"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
            ></Input>
          </div>
          {previewUrl && (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={previewUrl}
                width={200}
                height={122}
                alt="Food preview"
                className="w-full h-auto object-contain max-h-96"
              />
            </div>
          )}
          <div className=" flex justify-end">
            <Button
              size="sm"
              disabled={!selectedFile || loading}
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </div>

          <p className="flex gap-2 text-black font-inter text-xl font-semibold leading-6 tracking-normal">
            <FileTextIcon /> Here is the summary
          </p>
          {loading ? (
            <Loader className="size-8" />
          ) : result.content ? (
            <div className="max-w-full h-115 overflow-scroll rounded-xl border p-5 text-sm text-gray-900 leading-relaxed shadow-md font-sans">
              <TypingText
                text={`--Reason:\n${result.reason || ""}\n\nConclusion:\n${
                  getFirstSentence(result.content) || ""
                }`}
                speed={20}
              />
            </div>
          ) : (
            <p className="text-[#71717A] font-inter text-sm font-normal leading-6 tracking-normal">
              First, enter your image to recognize an ingredients.
            </p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
