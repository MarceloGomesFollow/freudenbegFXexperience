
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExchangeApplicationPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = z.object({
    requestType: z.enum(["voluntary", "manager_indication"], {
      required_error: t("exchangeCenter.apply.requestTypeRequired"),
    }),
    fullName: z.string().min(2, t("exchangeCenter.apply.fullNameRequired")),
    registration: z.string().min(1, t("exchangeCenter.apply.registrationRequired")),
    originUnit: z.string().min(2, t("exchangeCenter.apply.originUnitRequired")),
    currentRole: z.string().min(2, t("exchangeCenter.apply.currentRoleRequired")),
    companyTimeYears: z.coerce.number().min(0).optional(),
    companyTimeMonths: z.coerce.number().min(0).max(11).optional(),
    languages: z.string().optional(),
    objectives: z.string().min(10, t("exchangeCenter.apply.objectivesMin")),
    interestAreas: z.string().min(5, t("exchangeCenter.apply.interestAreasRequired")),
    interestUnits: z.string().min(5, t("exchangeCenter.apply.interestUnitsRequired")),
    availability: z.string().min(5, t("exchangeCenter.apply.availabilityRequired")),
    managerName: z.string().optional(),
    indicationJustification: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "Ana Silva",
      registration: "12345",
      originUnit: "Tecnologia",
      currentRole: "Analista de Sistemas Pleno",
      companyTimeYears: undefined,
      companyTimeMonths: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t("exchangeCenter.apply.toastTitle"),
      description: t("exchangeCenter.apply.toastDesc"),
    });
  }

  return (
    <div className="space-y-8">
      <Button variant="outline" asChild>
        <Link href="/dashboard/exchange-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t("exchangeCenter.apply.backToOpportunities")}
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{t("exchangeCenter.apply.formTitle")}</CardTitle>
          <CardDescription>
            {t("exchangeCenter.apply.formDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t("exchangeCenter.apply.requestType")} *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="voluntary" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("exchangeCenter.apply.voluntary")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="manager_indication" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("exchangeCenter.apply.managerIndication")}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">{t("exchangeCenter.apply.employeeData")}</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("exchangeCenter.apply.fullName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("exchangeCenter.apply.registration")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="originUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("exchangeCenter.apply.originUnit")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("exchangeCenter.apply.currentRole")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="grid md:grid-cols-3 gap-6 items-end">
                 <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.companyTime")}</FormLabel>
                    <div className="flex gap-2">
                        <FormField
                        control={form.control}
                        name="companyTimeYears"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input type="number" placeholder={t("exchangeCenter.apply.years")} {...field} value={field.value ?? ''} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="companyTimeMonths"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                <Input type="number" placeholder={t("exchangeCenter.apply.months")} {...field} value={field.value ?? ''} />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    </div>
                </FormItem>
                <div className="md:col-span-2">
                 <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t("exchangeCenter.apply.languages")}</FormLabel>
                        <FormControl>
                            <Input placeholder={t("exchangeCenter.apply.languagesPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.objectives")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("exchangeCenter.apply.objectivesPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">{t("exchangeCenter.apply.experienceDetails")}</h3>
              <FormField
                control={form.control}
                name="interestAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.interestAreas")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("exchangeCenter.apply.interestAreasPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="interestUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.interestUnits")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("exchangeCenter.apply.interestUnitsPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.availability")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("exchangeCenter.apply.availabilityPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium border-b pb-2">{t("exchangeCenter.apply.indicationSection")}</h3>
                <FormField
                control={form.control}
                name="managerName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.managerName")}</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="indicationJustification"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t("exchangeCenter.apply.indicationJustification")}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={t("exchangeCenter.apply.indicationJustificationPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="pt-6 flex justify-end">
                    <Button type="submit" size="lg">{t("exchangeCenter.apply.submitForApproval")}</Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
