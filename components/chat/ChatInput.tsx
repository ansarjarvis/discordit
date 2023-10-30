"use client";
import {
  messageCreationRequest,
  messageSchemaValidator,
} from "@/lib/validators/message";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus, Smile } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { Input } from "../ui/Input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

let ChatInput: FC<ChatInputProps> = ({
  apiUrl,
  query,
  name,
  type,
}: ChatInputProps) => {
  let form = useForm<messageCreationRequest>({
    resolver: zodResolver(messageSchemaValidator),
    defaultValues: {
      content: "",
    },
  });

  let onSubmit = async ({ content }: messageCreationRequest) => {
    console.log(content);
    let payload: messageCreationRequest = {
      content,
    };
    try {
      await axios.post(
        `${apiUrl}?channelId=${query.channelId}&serverId=${query.serverId}`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className=" relative p-4 pb-6">
                  <button
                    onClick={() => {}}
                    type="button"
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
