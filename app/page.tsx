import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <ThemeToggle />
    </>
  );
}
