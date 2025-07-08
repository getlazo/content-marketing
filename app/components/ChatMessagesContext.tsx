"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type ChatMessage = { from: "checker" | "target"; text: string };

const DEFAULT_MESSAGES: ChatMessage[] = [
  { from: "checker", text: "Hey! Are you free this weekend? 😏" },
  { from: "target", text: "Hey, who is this?" },
  { from: "checker", text: "Just someone who saw you on IG... You look cute 😉" },
  { from: "target", text: "Haha thanks. Do I know you?" },
  { from: "checker", text: "Not yet... but maybe we could get to know each other?" },
  { from: "target", text: "I have a girlfriend, sorry!" },
];

const ChatMessagesContext = createContext<{
  messages: ChatMessage[];
  setMessages: (msgs: ChatMessage[]) => void;
  resetMessages: () => void;
} | undefined>(undefined);

export function ChatMessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);

  // Load from localStorage
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lazo-chat-messages") : null;
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lazo-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  const resetMessages = () => setMessages(DEFAULT_MESSAGES);

  return (
    <ChatMessagesContext.Provider value={{ messages, setMessages, resetMessages }}>
      {children}
    </ChatMessagesContext.Provider>
  );
}

export function useChatMessages() {
  const ctx = useContext(ChatMessagesContext);
  if (!ctx) throw new Error("useChatMessages must be used within a ChatMessagesProvider");
  return ctx;
} 