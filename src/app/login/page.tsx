"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";

export default function LoginPage() {
  const loginArt = PlaceHolderImages.find(p => p.id === 'login-art');

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
              Enter your email below to login to your account
            </p>
          </div>
          <Card className="gold-border">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    This is a demo. Click login to continue.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
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
                        <Label htmlFor="password">Password</Label>
                        <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                        >
                        Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required defaultValue="password" />
                    </div>
                    <Button variant="gold" className="w-full rounded-xl h-11" asChild>
                        <Link href="/dashboard">Login</Link>
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/enrollment" className="underline">
                    Enroll now
                    </Link>
                </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginArt && (
            <Image
                src={loginArt.imageUrl}
                alt={loginArt.description}
                data-ai-hint={loginArt.imageHint}
                fill
                className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-primary/60" />
      </div>
    </div>
  );
}
