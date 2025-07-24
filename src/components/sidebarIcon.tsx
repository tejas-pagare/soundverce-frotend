import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function SideBarIcon({
  href,
  Icon,
  alt,
  label,
  extraClass = "",
}: {
  href: string;
  Icon: LucideIcon;
  alt: string;
  label: string;
  extraClass?: string;
}) {
  return (
    <Link href={href}>
      <Tooltip>
        <TooltipTrigger>
          <Icon className="w-5 h-5 text-white" aria-label={alt} />;
        </TooltipTrigger>
        <TooltipContent side={"right"}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
