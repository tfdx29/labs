import { BrailleLoader } from "@labs/ui/components/braille-loader";

export default function Loader({ text }: { text?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 pt-8">
      <BrailleLoader variant="rain" fontSize={28} label={text || "Loading Session..."} />
      {text && <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
}
