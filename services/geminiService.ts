import { GoogleGenAI, Type } from "@google/genai";
import { Platform, SocialPost, GeneratedContent, ImageSize, AspectRatio } from "../types";

// Helper to get a fresh instance with the latest key
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please select a key.");
  }
  return new GoogleGenAI({ apiKey });
};

export const improvePrompt = async (idea: string, imageBase64: string | null): Promise<string> => {
  const ai = getAIClient();
  
  const parts: any[] = [];
  
  if (imageBase64) {
    const base64Data = imageBase64.split(',')[1]; 
    const mimeType = imageBase64.split(';')[0].split(':')[1] || 'image/png';
    parts.push({ inlineData: { mimeType, data: base64Data } });
  }

  const promptText = `
    You are an expert creative director and social media strategist. 
    Refine the following user input into a clear, descriptive, and engaging prompt suitable for generating high-quality social media content.
    ${imageBase64 ? "An image has been provided. Analyze its key visual elements (subject, style, lighting, colors) and incorporate them into the refined prompt to ensure the output matches the visual context." : ""}
    
    User Input: "${idea}"
    
    Output only the refined prompt text. Keep it under 3 sentences, but make it evocative and specific.
  `;
  
  parts.push({ text: promptText });

  try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: { parts },
      });
    
      return response.text?.trim() || idea;
  } catch (e) {
      console.error("Prompt improvement failed", e);
      return idea; // Fallback to original
  }
};

export const generateSocialText = async (
  idea: string,
  tone: string
): Promise<Omit<GeneratedContent, 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'pinterest' | 'video'> & { 
  linkedin: Omit<SocialPost, 'imageUrls'>, 
  twitter: Omit<SocialPost, 'imageUrls'>, 
  instagram: Omit<SocialPost, 'imageUrls'>,
  facebook: Omit<SocialPost, 'imageUrls'>,
  pinterest: Omit<SocialPost, 'imageUrls'>
}> => {
  const ai = getAIClient();
  
  const prompt = `
    Generate 5 distinct social media posts based on this idea: "${idea}".
    Tone: ${tone}.
    
    1. LinkedIn: Professional, long-form, insightful.
    2. Twitter/X: Short, punchy, under 280 characters, no hashtags in body (maybe 1 at end).
    3. Instagram: Visual description implied in caption, engaging, casual, include 10-15 relevant hashtags.
    4. Facebook: Conversational, community-focused, moderate length, 3-5 hashtags.
    5. Pinterest: Descriptive, keyword-rich for searchability, inspiring, 5-8 hashtags.
    
    Return the response in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          linkedin: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              imagePrompt: { type: Type.STRING, description: "A detailed prompt to generate a photorealistic image for this post." }
            },
            required: ["content", "hashtags", "imagePrompt"]
          },
          twitter: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              imagePrompt: { type: Type.STRING, description: "A detailed prompt to generate a minimalist or punchy image." }
            },
            required: ["content", "hashtags", "imagePrompt"]
          },
          instagram: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              imagePrompt: { type: Type.STRING, description: "A highly aesthetic, instagram-worthy image prompt." }
            },
            required: ["content", "hashtags", "imagePrompt"]
          },
          facebook: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              imagePrompt: { type: Type.STRING, description: "A detailed prompt to generate an engaging, community-focused image." }
            },
            required: ["content", "hashtags", "imagePrompt"]
          },
          pinterest: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
              imagePrompt: { type: Type.STRING, description: "A highly visual, inspiring, vertical image prompt." }
            },
            required: ["content", "hashtags", "imagePrompt"]
          }
        }
      }
    }
  });

  const json = JSON.parse(response.text || "{}");
  
  return {
    linkedin: { ...json.linkedin, platform: Platform.LINKEDIN, aspectRatio: '4:5' }, // Default optimal
    twitter: { ...json.twitter, platform: Platform.TWITTER, aspectRatio: '16:9' },
    instagram: { ...json.instagram, platform: Platform.INSTAGRAM, aspectRatio: '1:1' },
    facebook: { ...json.facebook, platform: Platform.FACEBOOK, aspectRatio: '1:1' },
    pinterest: { ...json.pinterest, platform: Platform.PINTEREST, aspectRatio: '2:3' }
  };
};

export const generateImageForPlatform = async (
  prompt: string,
  aspectRatio: string,
  size: ImageSize,
  forcedRatio: AspectRatio,
  inputImageBase64: string | null,
  count: number = 1
): Promise<string[]> => {
  const ai = getAIClient();

  // Determine final aspect ratio
  let finalRatio = aspectRatio;
  if (forcedRatio !== AspectRatio.AUTO) {
    finalRatio = forcedRatio;
  }
  
  const validRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
  if (!validRatios.includes(finalRatio)) {
    finalRatio = "1:1"; 
  }

  const generateSingleImage = async (): Promise<string> => {
    try {
        let response;
        
        if (inputImageBase64) {
            const base64Data = inputImageBase64.split(',')[1];
            const mimeType = inputImageBase64.split(';')[0].split(':')[1] || 'image/png';

            response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [
                        { inlineData: { mimeType, data: base64Data } },
                        { text: `Edit this image to match the following description: ${prompt}` }
                    ]
                },
                config: {
                    imageConfig: {
                        aspectRatio: finalRatio,
                        imageSize: size
                    }
                }
            });

        } else {
            response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: {
                    parts: [{ text: prompt }]
                },
                config: {
                    imageConfig: {
                        aspectRatio: finalRatio,
                        imageSize: size
                    }
                }
            });
        }

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        throw new Error("No image data found in response");
    } catch (error) {
        console.error("Image generation error:", error);
        return ""; 
    }
  };

  // Execute calls in parallel for the requested count
  const promises = Array(count).fill(null).map(() => generateSingleImage());
  const results = await Promise.all(promises);
  
  return results.filter(url => url !== "");
};

export const generateVideo = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic, high quality video about: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16' // Vertical video for Stories/Reels
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5s polling
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed: No link returned");

    // Fetch with API Key to get the blob
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) throw new Error("Failed to download video");
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
    
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
};