"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  serverCreationRequest,
  serverSchemaValidator,
} from "@/lib/validators/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { Button } from "./ui/Button";
import { DialogFooter } from "./ui/Dialog";
import { Input } from "./ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/useModalStore";

const EditServerForm: FC = ({}) => {
  let { onClose, data } = useModalStore();
  let { server } = data;
  let router = useRouter();
  let form = useForm<serverCreationRequest>({
    resolver: zodResolver(serverSchemaValidator),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [form, server]);

  let { mutate: createServer, isLoading } = useMutation({
    mutationFn: async ({ name, imageUrl }: serverCreationRequest) => {
      let payload: serverCreationRequest = {
        name,
        imageUrl,
      };
      let { data } = await axios.patch(`/api/servers/${server?.id}`, payload);
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
        onSubmit={form.handleSubmit((data) => createServer(data))}
        className="space-y-8"
      >
        <div className="space-y-8 px-6">
          <div className="flex items-center justify-center text-center">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      endpoint="serverImage"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Server Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    placeholder="Enter Server Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button isLoading={isLoading} variant="primary">
            Update
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditServerForm;
