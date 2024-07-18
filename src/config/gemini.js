import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.0-pro";
  
  // Assurez-vous que votre clé API est définie
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
  async function runChat(prompt, history = []) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.75,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    // Vérifiez que l'historique est correctement formaté
    const formattedHistory = history.map(item => ({
      role: item.role === "assistant" ? "model" : item.role, // Convert "assistant" to "model"
      parts: [{ text: item.content }]
    }));
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: formattedHistory,
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  }
  
  export default runChat;
  