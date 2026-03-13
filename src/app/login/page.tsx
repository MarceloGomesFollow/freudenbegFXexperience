"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { LanguageToggle } from "@/components/language-toggle";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="min-h-screen flex items-center justify-center dashboard-bg p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto grid w-full max-w-[350px] px-4 sm:px-0 gap-6"
        >
          <div className="grid gap-2 text-center">
            <Link href="/">
              <Logo className="justify-center text-primary" />
            </Link>
            <h1 className="text-3xl font-bold mt-4">
              <span className="gold-text">FX</span>{" "}
              <span className="text-foreground">Experience</span>
            </h1>
            <div className="gold-gradient h-1 rounded-full w-16 mx-auto mt-3 mb-2" />
            <p className="text-balance text-muted-foreground">
              {t("loginPage.subtitle")}
            </p>
          </div>
          <Card className="gold-border">
            <CardHeader>
                <CardTitle className="text-2xl">{t("loginPage.title")}</CardTitle>
                <CardDescription>
                    {t("loginPage.demoText")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="email">{t("loginPage.email")}</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        defaultValue="demo@dpx.digital"
                    />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">{t("loginPage.password")}</Label>
                        <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                        >
                        {t("loginPage.forgotPassword")}
                        </Link>
                    </div>
                    <Input id="password" type="password" required defaultValue="password" />
                    </div>
                    <Button variant="gold" className="w-full rounded-xl h-11" asChild>
                        <Link href="/dashboard">{t("loginPage.loginButton")}</Link>
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    {t("loginPage.noAccount")}{" "}
                    <Link href="/enrollment" className="underline">
                    {t("loginPage.enrollNow")}
                    </Link>
                </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">{t('language')}:</span>
            <LanguageToggle />
          </div>
        </motion.div>
      </div>
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Video intro/fx exp video bd2 .mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/40" />
      </div>
    </div>
  );
}
