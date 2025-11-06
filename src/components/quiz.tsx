"use client";

import { useState } from "react";
import { type CourseQuizQuestion } from "@/ai/flows/generate-course-content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCw, Award } from "lucide-react";

type QuizProps = {
    questions: CourseQuizQuestion[];
};

type AnswerState = "unanswered" | "correct" | "incorrect";

export function Quiz({ questions }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null));
    const [answerStates, setAnswerStates] = useState<AnswerState[]>(Array(questions.length).fill("unanswered"));
    const [showResults, setShowResults] = useState(false);

    if (!questions || questions.length === 0) {
        return (
             <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">Nenhum quiz disponível.</p>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];
    const score = answerStates.filter(state => state === 'correct').length;

    const handleAnswerSelect = (option: string) => {
        if (answerStates[currentQuestionIndex] !== "unanswered") return;

        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = option;
        setSelectedAnswers(newSelectedAnswers);

        const newAnswerStates = [...answerStates];
        if (option === currentQuestion.correctAnswer) {
            newAnswerStates[currentQuestionIndex] = "correct";
        } else {
            newAnswerStates[currentQuestionIndex] = "incorrect";
        }
        setAnswerStates(newAnswerStates);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers(Array(questions.length).fill(null));
        setAnswerStates(Array(questions.length).fill("unanswered"));
        setShowResults(false);
    };

    if (showResults) {
        return (
            <Card>
                <CardHeader className="text-center">
                    <Award className="mx-auto h-12 w-12 text-yellow-500" />
                    <CardTitle>Quiz Concluído!</CardTitle>
                    <CardDescription>Você acertou {score} de {questions.length} perguntas.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button onClick={handleRetry}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Tentar Novamente
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Pergunta {currentQuestionIndex + 1}/{questions.length}</CardTitle>
                <CardDescription className="pt-2 text-base font-semibold text-foreground">{currentQuestion.question}</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={selectedAnswers[currentQuestionIndex] ?? undefined}
                    onValueChange={handleAnswerSelect}
                    disabled={answerStates[currentQuestionIndex] !== "unanswered"}
                >
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswers[currentQuestionIndex] === option;
                        const isCorrect = currentQuestion.correctAnswer === option;
                        const state = answerStates[currentQuestionIndex];

                        let indicator = null;
                        if (state !== 'unanswered' && isSelected) {
                            indicator = isCorrect ? <CheckCircle className="h-5 w-5 text-green-500"/> : <XCircle className="h-5 w-5 text-red-500"/>;
                        } else if (state !== 'unanswered' && isCorrect) {
                            indicator = <CheckCircle className="h-5 w-5 text-green-500"/>;
                        }

                        return (
                            <div key={index} className="flex items-center space-x-2 my-2">
                                <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                                <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
                                {indicator}
                            </div>
                        )
                    })}
                </RadioGroup>

                {answerStates[currentQuestionIndex] !== "unanswered" && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md border">
                        <p className="text-sm font-semibold">Justificativa:</p>
                        <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                )}

                <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Anterior
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        {currentQuestionIndex + 1} / {questions.length}
                    </p>
                    <Button onClick={handleNext} disabled={answerStates[currentQuestionIndex] === "unanswered"}>
                        {currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Próximo"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

    