"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function ModelTester() {
  const [models, setModels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchModels = async () => {
    setLoading(true)
    setError(null)
    try {
      // Initialize Gemini using environment variable
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key not found in environment variables");
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // List available models
      const result = await genAI.listModels();
      const modelNames = result.models.map(model => model.name);
      setModels(modelNames);
    } catch (err) {
      console.error("Error fetching models:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch models");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Model Tester</h2>
        <Button 
          onClick={fetchModels} 
          disabled={loading}
          className="mb-4"
        >
          {loading ? "Loading models..." : "Check Available Models"}
        </Button>
        
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        {models.length > 0 && (
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold mb-2">Available Models:</h3>
            <ul className="list-disc pl-5">
              {models.map((model, index) => (
                <li key={index}>{model}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
