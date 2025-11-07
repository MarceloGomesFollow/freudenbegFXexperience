
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, X, Mic, Sparkles, Calendar, Bell, MessageSquarePlus, Loader2 } from "lucide-react";
import { FreudIcon } from "./freud-icon";
import { chatWithFreudy } from "@/ai/flows/chatbot-flow";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Message = {
    from: "user" | "ai";
    text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "ai", text: "Olá! Sou o Freudy, seu assistente de IA. Como posso ajudar você a navegar na plataforma, agendar um evento ou tirar uma dúvida?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const { toast } = useToast();

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
                title: "Acesso ao Microfone Negado",
                description: "Por favor, habilite o acesso ao microfone nas configurações do seu navegador.",
              });
          }
        });
    }
  }, [isOpen, toast]);

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
        const errorMessage: Message = { from: "ai", text: "Desculpe, não consegui processar sua pergunta. Tente novamente." };
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
    { icon: Calendar, text: "Agendar mentoria" },
    { icon: Bell, text: "Ver notificações" },
    { icon: MessageSquarePlus, text: "Incluir meu gestor" }
  ];


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleOpen}
          size="icon"
          className="rounded-full w-16 h-16 bg-primary/90 backdrop-blur-sm hover:bg-primary/100 text-primary-foreground shadow-lg transition-transform hover:scale-110"
        >
          {isOpen ? <X className="h-8 w-8" /> : <FreudIcon className="h-8 w-8" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-sm"
          >
            <Card className="bg-card/60 backdrop-blur-xl border-border/20 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-card/30">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    <CardTitle>Freudy</CardTitle>
                </div>
                <CardDescription>Seu Assistente Pessoal</CardDescription>
              </CardHeader>
              <CardContent className="p-4 h-96 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                    {msg.from === 'ai' && <div className="p-2 bg-primary rounded-full text-primary-foreground"><FreudIcon className="h-5 w-5"/></div>}
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.from === 'ai' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary rounded-full text-primary-foreground">
                            <FreudIcon className="h-5 w-5"/>
                        </div>
                        <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted text-foreground flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    </div>
                )}
                {!isLoading && (
                    <div className="flex flex-wrap gap-2 justify-center pt-4">
                        {suggestedActions.map((action, index) => (
                            <Button key={index} variant="outline" size="sm" className="bg-background/70" onClick={() => setInputValue(action.text)}>
                                <action.icon className="h-3 w-3 mr-2"/>
                                {action.text}
                            </Button>
                        ))}
                    </div>
                )}
              </CardContent>
              <CardFooter className="p-4 bg-card/30 border-t">
                <div className="relative w-full flex items-center">
                  <Input
                    placeholder="Pergunte ao Freudy..."
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
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSendMessage} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
