import { BrailleLoader } from "@labs/ui/components/braille-loader";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center pt-8">
      <BrailleLoader variant="rain" fontSize={28} label="Loading Session..." />
    </div>
  );
}
