
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, X, Mic, Sparkles, Calendar, Bell, MessageSquarePlus } from "lucide-react";
import { FreudIcon } from "./freud-icon";
import { Badge } from "./ui/badge";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Olá! Sou o Freudy, seu assistente de IA. Como posso ajudar você a navegar na plataforma, agendar um evento ou tirar uma dúvida?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessages = [...messages, { from: "user", text: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "ai", text: "Esta é uma demonstração. A funcionalidade completa de chat com IA será implementada em breve." }]);
    }, 1000);
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
            <Card className="bg-card/80 backdrop-blur-lg border-border/20 shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="text-center bg-card/50">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-accent" />
                    <CardTitle>IA Freudy</CardTitle>
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
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {suggestedActions.map((action, index) => (
                        <Button key={index} variant="outline" size="sm" className="bg-background/70">
                            <action.icon className="h-3 w-3 mr-2"/>
                            {action.text}
                        </Button>
                    ))}
                </div>

              </CardContent>
              <CardFooter className="p-4 bg-card/50 border-t">
                <div className="relative w-full flex items-center">
                  <Input
                    placeholder="Pergunte ao Freudy..."
                    className="pr-20 bg-background"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute right-2 flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                        <Mic className="h-4 w-4 text-muted-foreground" />
                    </Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSendMessage}>
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
