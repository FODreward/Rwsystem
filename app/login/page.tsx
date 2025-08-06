"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiCall } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.onloadCallback = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          size: "invisible",
          badge: "bottomright",
          callback: async (token: string) => {
            await loginWithCaptcha(token);
          },
          "error-callback": () => {
            toast({
              title: "reCAPTCHA Error",
              description: "Failed to verify reCAPTCHA. Please try again.",
              variant: "destructive",
            });
            setIsLoading(false);
          },
        });
        setIsRecaptchaReady(true);
      }
    };

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onloadCallback;
    };
  }, [toast]);

  const loginWithCaptcha = async (token: string) => {
    try {
      const response = await apiCall("/auth/login", "POST", {
        email,
        password,
        recaptchaToken: token,
      });

      if (response.success) {
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("currentUser", JSON.stringify(response.user));
        toast({ title: "Login successful" });
        router.push("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: response.message || "Invalid credentials or reCAPTCHA failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      window.grecaptcha?.reset(widgetIdRef.current!);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRecaptchaReady || !window.grecaptcha || widgetIdRef.current === null) {
      toast({
        title: "reCAPTCHA not ready",
        description: "Please wait for reCAPTCHA to finish loading.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await window.grecaptcha.execute(widgetIdRef.current!);
    } catch (error) {
      toast({
        title: "reCAPTCHA Execution Failed",
        description: "Could not execute invisible reCAPTCHA.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div ref={recaptchaRef} style={{ display: "none" }}></div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
