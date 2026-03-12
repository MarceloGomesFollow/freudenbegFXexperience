
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Mic, Sparkles, Calendar, Bell, MessageSquarePlus, Loader2 } from "lucide-react";
import { FreudyIAIcon } from "./freudy-ia-icon";
import { chatWithFreudy } from "@/ai/flows/chatbot-flow";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

type Message = {
    from: "user" | "ai";
    text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    setMessages([
        { from: "ai", text: t('chatbot.welcome') }
    ])
  }, [language, t]);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setHasMicPermission(true);
          // Stop the track immediately, we only needed to ask for permission
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => {
          setHasMicPermission(false);
          console.error("Microphone access denied:", err);
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              toast({
                variant: "destructive",
                title: t('chatbot.micDenied.title'),
                description: t('chatbot.micDenied.description'),
              });
          }
        });
    }
  }, [isOpen, toast, t]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage: Message = { from: "user", text: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
        const response = await chatWithFreudy({
            question: inputValue,
            chatHistory: newMessages,
        });
        const aiMessage: Message = { from: "ai", text: response.answer };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        console.error("Error with chatbot flow:", error);
        const errorMessage: Message = { from: "ai", text: t('chatbot.error') };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const suggestedActions = [
    { icon: Calendar, text: t('chatbot.actions.schedule') },
    { icon: Bell, text: t('chatbot.actions.notifications') },
    { icon: MessageSquarePlus, text: t('chatbot.actions.manager') }
  ];


  return (
    <>
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="crystal-button animate-pulse-gold fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 safe-bottom"
      >
        {isOpen ? <X className="h-6 w-6 relative z-10" /> : (
          <Image
            src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Freudy IA"
            fill
            className="object-cover rounded-full relative z-10"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-40 w-[calc(100%-1.5rem)] sm:w-full sm:max-w-sm"
          >
            <div className="crystal-panel overflow-hidden flex flex-col max-h-[70vh] sm:max-h-[500px] safe-bottom">
              <div className="text-center p-4 border-b border-white/10">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    <h3 className="text-lg font-semibold">Freudy</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t('chatbot.tagline')}</p>
              </div>
              <div className="p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                    {msg.from === 'ai' && <div className="p-2 bg-primary rounded-full text-primary-foreground"><FreudyIAIcon className="h-5 w-5"/></div>}
                    <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${msg.from === 'ai' ? 'bg-muted/30 text-foreground border-l-2 border-gold/50' : 'bg-primary text-primary-foreground'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary rounded-full text-primary-foreground">
                            <FreudyIAIcon className="h-5 w-5"/>
                        </div>
                        <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted text-foreground flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    </div>
                )}
                {!isLoading && (
                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {suggestedActions.map((action, index) => (
                            <Button key={index} variant="glass" size="sm" onClick={() => setInputValue(action.text)}>
                                <action.icon className="h-3 w-3 mr-2"/>
                                {action.text}
                            </Button>
                        ))}
                    </div>
                )}
              </div>
              <div className="p-4 border-t border-white/10">
                <div className="relative w-full flex items-center">
                  <Input
                    placeholder={t('chatbot.placeholder')}
                    className="pr-20 bg-background"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                  <div className="absolute right-2 flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={!hasMicPermission}>
                        <Mic className={cn("h-4 w-4", hasMicPermission ? "text-primary" : "text-muted-foreground")} />
                    </Button>
                     <Button size="icon" className="h-8 w-8 gold-gradient rounded-lg text-white" onClick={handleSendMessage} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
