
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Users, Lightbulb, Phone, Flag, Shield, Activity, Share, PlaneTakeoff, Plane, PlaneLanding, Handshake, MessageCircle, GitBranch, UserCheck, Star, BookCopy, LayoutDashboard, NotebookText, Beaker, GraduationCap, Briefcase, BrainCircuit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GeneralGuidePage() {
    const { t } = useLanguage();

    const accordionSurfaceClass = "rounded-lg border border-border/70 bg-card/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-card/90";

    const responsibilities = [
        t('generalGuide.responsibilities.0'),
        t('generalGuide.responsibilities.1'),
        t('generalGuide.responsibilities.2'),
        t('generalGuide.responsibilities.3'),
        t('generalGuide.responsibilities.4'),
    ];

    const tips = [
        { icon: <Lightbulb className="h-5 w-5 text-accent"/>, text: t('generalGuide.tips.0') },
        { icon: <Users className="h-5 w-5 text-accent"/>, text: t('generalGuide.tips.1') },
        { icon: <Activity className="h-5 w-5 text-accent"/>, text: t('generalGuide.tips.2') },
        { icon: <Shield className="h-5 w-5 text-accent"/>, text: t('generalGuide.tips.3') },
        { icon: <Phone className="h-5 w-5 text-accent"/>, text: t('generalGuide.tips.4') },
    ];

    const managerResponsibilities = [
        { icon: <Handshake className="h-5 w-5 text-accent"/>, text: t('generalGuide.alignExpectations') },
        { icon: <MessageCircle className="h-5 w-5 text-accent"/>, text: t('generalGuide.communicateTeam') },
        { icon: <GitBranch className="h-5 w-5 text-accent"/>, text: t('generalGuide.reassessResponsibilities') },
        { icon: <UserCheck className="h-5 w-5 text-accent"/>, text: t('generalGuide.formalizeLending') },
    ];


    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{t('generalGuide.title')}</h2>
                <p className="mt-2 text-muted-foreground">
                    {t('generalGuide.subtitle')}
                </p>
            </div>
             <Tabs defaultValue="participant" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
                    <TabsTrigger value="participant">{t('generalGuide.tabs.participant')}</TabsTrigger>
                    <TabsTrigger value="manager">{t('generalGuide.tabs.manager')}</TabsTrigger>
                    <TabsTrigger value="tutorial"><BookCopy className="mr-2 h-4 w-4"/>{t('generalGuide.tabs.tutorial')}</TabsTrigger>
                </TabsList>
                <TabsContent value="participant" className="mt-6">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('generalGuide.guideObjective')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {t('generalGuide.participantObjective')}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Flag className="h-6 w-6 text-primary"/>
                                    {t('generalGuide.roleTitle')}
                                </CardTitle>
                                <CardDescription>
                                    {t('generalGuide.roleDesc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className={accordionSurfaceClass}>
                        <Accordion type="single" collapsible defaultValue="item-2" className="w-full px-4 sm:px-6">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneTakeoff className="h-5 w-5"/> {t('generalGuide.beforeExchange')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <ul className="list-disc space-y-2">
                                        <li>{t('generalGuide.beforeItems.0')}</li>
                                        <li>{t('generalGuide.beforeItems.1')}</li>
                                        <li>{t('generalGuide.beforeItems.2')}</li>
                                        <li>{t('generalGuide.beforeItems.3')}</li>
                                        <li>{t('generalGuide.beforeItems.4')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><Plane className="h-5 w-5"/> {t('generalGuide.duringExchange')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <ul className="list-disc space-y-2">
                                        <li>{t('generalGuide.duringItems.0')}</li>
                                        <li>{t('generalGuide.duringItems.1')}</li>
                                        <li>{t('generalGuide.duringItems.2')}</li>
                                        <li>{t('generalGuide.duringItems.3')}</li>
                                        <li>{t('generalGuide.duringItems.4')}</li>
                                        <li>{t('generalGuide.duringItems.5')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneLanding className="h-5 w-5"/> {t('generalGuide.afterExchange')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                   <ul className="list-disc space-y-2">
                                        <li>{t('generalGuide.afterItems.0')}</li>
                                        <li>{t('generalGuide.afterItems.1')}</li>
                                        <li>{t('generalGuide.afterItems.2')}</li>
                                        <li>{t('generalGuide.afterItems.3')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('generalGuide.tipsTitle')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {tips.map((tip, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            {tip.icon}
                                            <p className="text-sm text-muted-foreground">{tip.text}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('generalGuide.resourcesTitle')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm">{t('generalGuide.supportResources')}</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li>{t('generalGuide.supportItems.0')}</li>
                                            <li>{t('generalGuide.supportItems.1')}</li>
                                            <li>{t('generalGuide.supportItems.2')}</li>
                                            <li>{t('generalGuide.supportItems.3')}</li>
                                        </ul>
                                    </div>
                                     <div>
                                        <h4 className="font-semibold text-sm">{t('generalGuide.importantContacts')}</h4>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li>{t('generalGuide.contactItems.0')}</li>
                                            <li>{t('generalGuide.contactItems.1')}</li>
                                            <li>{t('generalGuide.contactItems.2')}</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="manager" className="mt-6">
                    <div className="space-y-8">
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('generalGuide.guideObjective')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                   {t('generalGuide.managerObjective')}
                                </p>
                            </CardContent>
                        </Card>

                        <div className={accordionSurfaceClass}>
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full px-4 sm:px-6">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneTakeoff className="h-5 w-5"/> {t('generalGuide.beforeLending')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p className="font-semibold mb-2">{t('generalGuide.alignExpectations')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.alignItems.0')}</li>
                                        <li>{t('generalGuide.alignItems.1')}</li>
                                        <li>{t('generalGuide.alignItems.2')}</li>
                                    </ul>
                                    <p className="font-semibold mb-2">{t('generalGuide.communicateTeam')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.communicateItems.0')}</li>
                                        <li>{t('generalGuide.communicateItems.1')}</li>
                                    </ul>
                                     <p className="font-semibold mb-2">{t('generalGuide.formalizeLending')}</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>{t('generalGuide.formalizeItems.0')}</li>
                                        <li>{t('generalGuide.formalizeItems.1')}</li>
                                        <li>{t('generalGuide.formalizeItems.2')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><Plane className="h-5 w-5"/> {t('generalGuide.duringPeriod')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p className="font-semibold mb-2">{t('generalGuide.avoidOverload')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.avoidItems.0')}</li>
                                        <li>{t('generalGuide.avoidItems.1')}</li>
                                    </ul>
                                    <p className="font-semibold mb-2">{t('generalGuide.maintainContact')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.maintainItems.0')}</li>
                                    </ul>
                                     <p className="font-semibold mb-2">{t('generalGuide.facilitateAdaptation')}</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>{t('generalGuide.facilitateItems.0')}</li>
                                        <li>{t('generalGuide.facilitateItems.1')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><PlaneLanding className="h-5 w-5"/> {t('generalGuide.afterReturn')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                   <p className="font-semibold mb-2">{t('generalGuide.integrationMoment')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.integrationItems.0')}</li>
                                        <li>{t('generalGuide.integrationItems.1')}</li>
                                    </ul>
                                     <p className="font-semibold mb-2">{t('generalGuide.reassessResponsibilities')}</p>
                                    <ul className="list-disc space-y-2 mb-4 pl-5">
                                        <li>{t('generalGuide.reassessItems.0')}</li>
                                        <li>{t('generalGuide.reassessItems.1')}</li>
                                    </ul>
                                     <p className="font-semibold mb-2">{t('generalGuide.shareFeedback')}</p>
                                     <ul className="list-disc space-y-2 pl-5">
                                        <li>{t('generalGuide.shareFeedbackItems.0')}</li>
                                        <li>{t('generalGuide.shareFeedbackItems.1')}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        </div>
                        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Star className="h-6 w-6" /> {t('generalGuide.importantReminder')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-primary/90">
                                    {t('generalGuide.reminderText')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                 <TabsContent value="tutorial" className="mt-6">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('generalGuide.tutorialTitle')}</CardTitle>
                                <CardDescription>{t('generalGuide.tutorialSubtitle')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {t('generalGuide.tutorialIntro')}
                                </p>
                            </CardContent>
                        </Card>

                        <div className={accordionSurfaceClass}>
                        <Accordion type="single" collapsible className="w-full px-4 sm:px-6" defaultValue="item-1">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <h3 className="text-lg font-semibold flex items-center gap-2"><LayoutDashboard className="h-5 w-5"/> {t('generalGuide.dashboardsTitle')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6">
                                    <p>{t('generalGuide.dashboardsDesc')}</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><NotebookText className="h-5 w-5"/> {t('generalGuide.diaryTitle')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>{t('generalGuide.diaryDesc')}</p>
                                    <ul className="list-disc pl-5">
                                        <li><b>{t('generalGuide.diaryItems.0').split(':')[0]}:</b>{t('generalGuide.diaryItems.0').substring(t('generalGuide.diaryItems.0').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.diaryItems.1').split(':')[0]}:</b>{t('generalGuide.diaryItems.1').substring(t('generalGuide.diaryItems.1').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.diaryItems.2').split(':')[0]}:</b>{t('generalGuide.diaryItems.2').substring(t('generalGuide.diaryItems.2').indexOf(':') + 1)}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-3">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><Beaker className="h-5 w-5"/> {t('generalGuide.innovationTitle')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>{t('generalGuide.innovationDesc')}</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>{t('generalGuide.innovationItems.0').split(':')[0]}:</b>{t('generalGuide.innovationItems.0').substring(t('generalGuide.innovationItems.0').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.innovationItems.1').split(':')[0]}:</b>{t('generalGuide.innovationItems.1').substring(t('generalGuide.innovationItems.1').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.innovationItems.2').split(':')[0]}:</b>{t('generalGuide.innovationItems.2').substring(t('generalGuide.innovationItems.2').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.innovationItems.3').split(':')[0]}:</b>{t('generalGuide.innovationItems.3').substring(t('generalGuide.innovationItems.3').indexOf(':') + 1)}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5"/> {t('generalGuide.learningTitle')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>{t('generalGuide.learningDesc')}</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>{t('generalGuide.learningItems.0').split(':')[0]}:</b>{t('generalGuide.learningItems.0').substring(t('generalGuide.learningItems.0').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.learningItems.1').split(':')[0]}:</b>{t('generalGuide.learningItems.1').substring(t('generalGuide.learningItems.1').indexOf(':') + 1)}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-5">
                                <AccordionTrigger>
                                     <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="h-5 w-5"/> {t('generalGuide.mobilityTitle')}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pl-6 space-y-2">
                                    <p>{t('generalGuide.mobilityDesc')}</p>
                                     <ul className="list-disc pl-5">
                                        <li><b>{t('generalGuide.mobilityItems.0').split(':')[0]}:</b>{t('generalGuide.mobilityItems.0').substring(t('generalGuide.mobilityItems.0').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.mobilityItems.1').split(':')[0]}:</b>{t('generalGuide.mobilityItems.1').substring(t('generalGuide.mobilityItems.1').indexOf(':') + 1)}</li>
                                        <li><b>{t('generalGuide.mobilityItems.2').split(':')[0]}:</b>{t('generalGuide.mobilityItems.2').substring(t('generalGuide.mobilityItems.2').indexOf(':') + 1)}</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        </div>
                    </div>
                 </TabsContent>
            </Tabs>
        </div>
    );
}
