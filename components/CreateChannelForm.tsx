"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useModalStore } from "@/hooks/useModalStore";
import {
  channelCreationRequest,
  channelSchemaValidator,
} from "@/lib/validators/channel";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { DialogFooter } from "./ui/Dialog";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

const CreateChannelForm: FC = ({}) => {
  let { onClose } = useModalStore();
  let router = useRouter();
  let params = useParams();
  let { slug: serverId } = params;

  let form = useForm<channelCreationRequest>({
    resolver: zodResolver(channelSchemaValidator),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  let { mutate: createChannel, isLoading } = useMutation({
    mutationFn: async ({ name, type }: channelCreationRequest) => {
      let payload: channelCreationRequest = {
        name,
        type,
      };
      let { data } = await axios.post(
        `/api/channels?serverId=${serverId}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      form.reset();
      router.refresh();
      onClose();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log("unauthorized user please do login");
        }
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => createChannel(data))}
        className="space-y-8"
      >
        <div className="space-y-8 px-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Channel Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    placeholder="Enter Channel Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Channel Type
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                      <SelectValue placeholder="Select Channel Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ChannelType).map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button isLoading={isLoading} variant="primary">
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateChannelForm;
