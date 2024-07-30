import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSent = async (prompt) => {
    setLoading(true);
    
    // Vérifier si un prompt est donné ou utiliser l'input actuel
    const userMessage = prompt || input;

    let history = [];
    if (currentConversationId !== null) {
      const currentConversation = conversations.find(conv => conv.id === currentConversationId);
      if (currentConversation) {
        history = currentConversation.messages;
      }
    }

    // Ajout du message utilisateur dans l'historique
    const newMessage = {
      role: "user",
      content: userMessage,
    };

    let response;
    try {
      response = await runChat(userMessage, history);
    } catch (error) {
      console.error("Error in runChat:", error);
      response = "Sorry, something went wrong.";
    }

    // Ajout de la réponse de l'assistant
    const newResponse = {
      role: "assistant",
      content: response,
    };

    // Mise à jour des conversations
    setConversations((prev) => {
      if (currentConversationId === null) {
        const newConversation = {
          id: prev.length + 1,
          messages: [newMessage, newResponse],
        };
        setCurrentConversationId(newConversation.id);
        return [...prev, newConversation];
      } else {
        return prev.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage, newResponse],
              }
            : conv
        );
      }
    });

    setLoading(false);
    setInput("");
  };

  const newChat = () => {
    // Générer un nouvel ID et ajouter une nouvelle conversation
    const newId = conversations.length + 1;
    setConversations([...conversations, { id: newId, messages: [] }]);
    setCurrentConversationId(newId);
  };

  const contextValue = {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    onSent,
    input,
    setInput,
    loading,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
