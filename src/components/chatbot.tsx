
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Mic, Sparkles, Calendar, Bell, MessageSquarePlus, Loader2, Minus, Maximize2, GripHorizontal, ExternalLink } from "lucide-react";
import { FreudyIAIcon } from "./freudy-ia-icon";
import { chatWithFreudy } from "@/ai/flows/chatbot-flow";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Message = {
    from: "user" | "ai";
    text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
            language: language as 'pt' | 'en' | 'de',
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
    { icon: Sparkles, text: language === 'pt' ? 'O que posso fazer na plataforma?' : language === 'de' ? 'Was kann ich auf der Plattform tun?' : 'What can I do on the platform?' },
    { icon: Calendar, text: language === 'pt' ? 'Como funciona o intercâmbio?' : language === 'de' ? 'Wie funktioniert der Austausch?' : 'How does the exchange work?' },
    { icon: MessageSquarePlus, text: language === 'pt' ? 'Me ajude a submeter uma ideia' : language === 'de' ? 'Hilf mir, eine Idee einzureichen' : 'Help me submit an idea' },
  ];


  return (
    <>
      {/* Drag boundary — full viewport */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-30" />

      {/* FAB button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="crystal-button fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 safe-bottom"
        aria-label={isOpen ? t('chatbot.ariaClose') : t('chatbot.ariaOpen')}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center justify-center"
            >
              <X className="h-6 w-6 drop-shadow-sm" />
            </motion.span>
          ) : (
            <motion.span
              key="avatar"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <Image
                src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Freudy IA"
                fill
                className="object-cover rounded-full"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window — draggable & minimizable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            dragMomentum={false}
            className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-40 w-[calc(100%-1.5rem)] sm:w-full sm:max-w-sm pointer-events-auto"
          >
            <div className="crystal-panel overflow-hidden flex flex-col safe-bottom">
              {/* Title bar — crystal glass header with gold accent */}
              <div
                className="relative flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing select-none overflow-hidden"
                onPointerDown={(e) => dragControls.start(e)}
              >
                {/* Crystal glass header background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-white/[0.08] backdrop-blur-sm" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {/* Left — avatar + title */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1.5 ring-gold/50 shadow-sm shadow-gold/20">
                    <Image
                      src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Freudy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xs font-semibold leading-tight gold-text">Freudy</h3>
                    <span className="text-[10px] text-muted-foreground/70 leading-tight hidden sm:block">{t('chatbot.tagline')}</span>
                  </div>
                </div>

                {/* Right — window controls */}
                <div className="relative z-10 flex items-center gap-0.5">
                  {/* FreudyIA shortcut */}
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push('/dashboard/special-resources'); setIsOpen(false); }}
                    className="group p-1.5 rounded-full glass-subtle hover:gold-glow transition-all duration-200"
                    aria-label={t('chatbot.ariaOpenIA')}
                    title="FreudyIA"
                  >
                    <ExternalLink className="h-3 w-3 text-gold group-hover:text-gold-light transition-colors" />
                  </button>
                  {/* Minimize */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label={isMinimized ? t('chatbot.ariaExpand') : t('chatbot.ariaMinimize')}
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3 text-muted-foreground/70" /> : <Minus className="h-3 w-3 text-muted-foreground/70" />}
                  </button>
                  {/* Close */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }}
                    className="p-1.5 rounded-full hover:bg-red-500/20 transition-colors"
                    aria-label={t('chatbot.ariaClose')}
                  >
                    <X className="h-3 w-3 text-muted-foreground/70" />
                  </button>
                </div>
              </div>

              {/* Collapsible body */}
              <AnimatePresence initial={false}>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 h-80 sm:h-96 overflow-y-auto space-y-3">
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-2.5 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                          {msg.from === 'ai' && (
                            <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden ring-1 ring-gold/30 relative">
                              <Image
                                src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Freudy"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className={cn(
                            "rounded-2xl px-3.5 py-2.5 max-w-[82%] text-sm leading-relaxed",
                            msg.from === 'ai'
                              ? 'glass-subtle text-foreground border-l-2 border-gold/40'
                              : 'bg-primary text-primary-foreground'
                          )}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-start gap-2.5">
                          <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden ring-1 ring-gold/30 relative">
                            <Image
                              src="https://images.unsplash.com/photo-1764360840282-838414e69953?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Freudy"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="glass-subtle rounded-2xl px-4 py-2.5 flex items-center gap-2">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                            <span className="text-xs text-muted-foreground">{language === 'pt' ? 'Pensando...' : language === 'de' ? 'Denke nach...' : 'Thinking...'}</span>
                          </div>
                        </div>
                      )}
                      {!isLoading && messages.length <= 1 && (
                        <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                          {suggestedActions.map((action, index) => (
                            <Button key={index} variant="glass" size="sm" className="text-xs h-7 px-2.5" onClick={() => setInputValue(action.text)}>
                              <action.icon className="h-3 w-3 mr-1.5"/>
                              {action.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Input area with crystal divider */}
                    <div className="relative px-3 py-2.5">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      <div className="relative flex items-center gap-1.5">
                        <Input
                          placeholder={t('chatbot.placeholder')}
                          className="flex-1 pr-10 bg-white/5 border-white/10 focus:border-gold/40 focus:ring-gold/20 text-sm h-9 rounded-xl"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          disabled={isLoading}
                        />
                        <Button
                          size="icon"
                          className="shrink-0 h-9 w-9 rounded-xl gold-gradient text-white shadow-sm shadow-gold/20 hover:shadow-gold/40 transition-shadow"
                          onClick={handleSendMessage}
                          disabled={isLoading}
                        >
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
