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

    let history = [];
    if (currentConversationId !== null) {
      const currentConversation = conversations.find(conv => conv.id === currentConversationId);
      if (currentConversation) {
        history = currentConversation.messages;
      }
    }

    let response;
    if (prompt) {
      response = await runChat(prompt, history);
    } else {
      response = await runChat(input, history);
    }

    const newMessage = {
      role: "user",
      content: input,
    };
    const newResponse = {
      role: "assistant",
      content: response,
    };

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
    setCurrentConversationId(conversations.length + 1);
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
