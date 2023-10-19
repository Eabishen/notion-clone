import { Button } from "@/components/ui/button";
import Heading from "./_components/Heading";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="px-6 pb-10 flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
