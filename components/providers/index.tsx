"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import ModalProvider from "./ModalProvider";

let Provider = ({ children }: { children: React.ReactNode }) => {
  let queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="discordit-theme"
      >
        <ModalProvider />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Provider;
