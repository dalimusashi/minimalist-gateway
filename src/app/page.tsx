import { InteractiveHeadline } from "@/components/InteractiveHeadline";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 text-white overflow-hidden">
      <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto">
        <InteractiveHeadline />
      </div>

      <footer className="absolute bottom-8 w-full text-center px-6">
        <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-30 font-light">
          Gabriel Duro
        </p>
      </footer>
    </main>
  );
}
