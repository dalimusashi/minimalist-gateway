"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/app/actions/contact";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),

  // Honeypot: humans won’t fill this; bots often do.
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    if (isSubmitting) return;

    // If honeypot is filled, silently pretend success.
    if (data.website && data.website.trim().length > 0) {
      form.reset();
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const { website, ...payload } = data; // don’t send honeypot to backend
      const result = await sendContactEmail(payload);

      if (result.success) {
        toast({
          title: "Message sent",
          description: "I’ll get back to you shortly.",
        });
        form.reset();
        onOpenChange(false);
      } else {
        throw new Error(result.error || "Failed to send message.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black border-white/10 text-white p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-light tracking-tight uppercase">
            Get in touch
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field (hidden) */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" {...form.register("website")} />
              </label>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] tracking-widest opacity-50">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      className="bg-transparent border-white/10 focus:border-white transition-colors h-12 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] tracking-widest opacity-50">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      className="bg-transparent border-white/10 focus:border-white transition-colors h-12 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-[10px] tracking-widest opacity-50">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's this about?"
                      className="bg-transparent border-white/10 focus:border-white transition-colors h-12 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-none uppercase text-xs tracking-[0.2em] font-light mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
