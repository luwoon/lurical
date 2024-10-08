import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey} from "react-use";

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none",
  type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-[#7AD4D5]/60 bg-[#7AD4D5]/30 hover:bg-[#7AD4D5]/30",
        selected &&
          status === "correct" &&
          "border-[#9DD887]/60 bg-[#9DD887]/30 hover:bg-[#9DD887]/30",
        selected &&
          status === "wrong" &&
          "border-[#EA867B]/60 bg-[#EA867B]/30 hover:bg-[#EA867B]/30 ",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-p150px w-full">
          <Image src={imageSrc} width={80} height={80} alt={text} />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-neutral-500] text-sm lg:text-base",
            selected && "text-[#7AD4D5]",
            selected && status === "correct" && "text-[#9DD887]",
            selected && status === "wrong" && "text-[#EA867B]"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 l:text-[15px] text-xs font-semibold",
            selected && "border-[#7AD4D5]/50 text-[#7AD4D5]",
            selected &&
              status === "correct" &&
              "border-[#9DD887]/60 text-[#9DD887]",
            selected &&
              status === "wrong" &&
              "border-[#EA867B]/60 text-[#EA867B]"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};