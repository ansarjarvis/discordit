"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  serverCreationRequest,
  serverSchemaValidator,
} from "@/lib/validators/server";
import { Input } from "./ui/Input";
import { DialogFooter } from "./ui/Dialog";
import { Button } from "./ui/Button";
import FileUpload from "./FileUpload";

const CreateServerForm: FC = ({}) => {
  let form = useForm<serverCreationRequest>({
    resolver: zodResolver(serverSchemaValidator),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  let formSubmitHandler = (data: serverCreationRequest) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmitHandler)}
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
          <Button disabled={form.formState.isSubmitting} variant="primary">
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateServerForm;
