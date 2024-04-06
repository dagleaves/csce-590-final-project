import { NavBar } from "@/components/navbar/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Layout({
  children,
  navbar,
}: {
  children: React.ReactNode;
  navbar: boolean;
}) {
  return (
    <ScrollArea className="flex flex-col h-screen">
      {navbar && <NavBar />}
      <main className="flex flex-col items-center flex-1 bg-background pb-4 dark:[color-scheme:dark]">
        {children}
      </main>
    </ScrollArea>
  );
}
