"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { submitAccount } from "@/server/actions/user";
import { useToast } from "../ui/use-toast";

// Imports

type Props = { email: string; userId: string };
type ServerRes = {
  variant?: "default" | "destructive" | null | undefined;
  title: string;
  description: string;
};

// Props

const formSchema = z.object({
  url: z.string().min(2).max(50, {
    message: "Username must be at least 2 characters.",
  }),
  auth_token: z.string(),
  ct0: z.string(),
});
// Define the form schema

export default function EnterAccountForm({ email, userId }: Props) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      auth_token: "",
      ct0: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast({
      title: "Checking data",
      description: "the validity of your account is being checked",
    });

    const res: ServerRes = await submitAccount(
      values.url,
      values.auth_token,
      values.ct0,
      email,
      userId
    );

    form.reset();

    console.log(res);
    toast(res);
  }

  return (
    <div className="m-30 mx-auto mt-12 w-11/12  w-full rounded-3xl bg-card">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {/* Inputs */}
          <div className="mx-auto flex w-full justify-center gap-4 py-10">
            {/* URL input */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-3/12">
                  <FormControl>
                    <Input placeholder="Profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Auth_token input */}
            <FormField
              control={form.control}
              name="auth_token"
              render={({ field }) => (
                <FormItem className="w-3/12">
                  <FormControl>
                    <Input placeholder="Auth Token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ct0 input */}
            <FormField
              control={form.control}
              name="ct0"
              render={({ field }) => (
                <FormItem className="w-3/12">
                  <FormControl>
                    <Input placeholder="Ct0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-2/12 bg-[#6C48F7]">
              Add Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
