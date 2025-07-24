import Link from "next/link";
import type { LucideIcon } from 'lucide-react';
import clsx from "clsx";

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
    <Link
      href={href}
      className={clsx("group relative flex items-center justify-center overflow-visible", extraClass)}
    >
      <Icon className="w-5 h-5 text-white" aria-label={alt} />
      {/* Tooltip appears on hover */}
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white text-black text-sm font-medium rounded-lg px-2 py-1 border border-black/10 min-w-[60px] text-center pointer-events-none">
        {label}
      </span>
    </Link>
  );
}

