"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "./ModalProvider";
import SocketProvider from "./SocketProvider";
import { ThemeProvider } from "./theme-provider";

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
        <SocketProvider>
          <ModalProvider />
          {children}
        </SocketProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Provider;
