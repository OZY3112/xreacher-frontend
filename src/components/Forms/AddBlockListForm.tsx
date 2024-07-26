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
import { useToast } from "../ui/use-toast";
import { extractUserFromXComUrl } from "@/lib/utils";
import { addUserToBlockList } from "@/server/actions/user";

type Props = { userId: string };

const formSchema = z.object({
  url: z.string().min(2).max(50, {
    message: "Username must be at least 2 characters.",
  }),
});
// Define the form schema

export default function AddBlockListForm({ userId }: Props) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Adding user to blocklist",
      // description: "the validity of your account is being checked",
    });
    const username = extractUserFromXComUrl(values.url);

    const res = await addUserToBlockList(username, userId);
    console.log(values);
  }
  return (
    <div className="m-30 mx-auto mt-12 w-11/12  w-full rounded-3xl bg-card p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex justify-between">
            <Button className="!bg-[#6C48F7]" variant="destructive">
              Bulk upload CSV
            </Button>

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-72">
                    <FormControl>
                      <Input placeholder="Enter account link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="!bg-[#6C48F7]" variant="destructive">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
