"use client";
import Link from "next/link";
import { useState } from "react";
import SideBarIcon from "./sidebarIcon";
import { PlusCircle, Home, Search, Library } from "lucide-react";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarOptions = [
    { href: "/add", Icon: PlusCircle, alt: "Add", label: "Add" },
    { href: "/", Icon: Home, alt: "Home", label: "Home" },
    { href: "/explore", Icon: Search, alt: "Explore", label: "Explore" },
    {
      href: "/library",
      Icon: Library,
      alt: "Library",
      label: "Library",
      extraClass: "mb-1 sm:mb-2",
    }
  ];
  return (
    <div className="min-h-screen">
      {/* Hamburger button: shown on tablet/mobile only */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-[#000000] rounded-lg flex items-center justify-center border border-[#383838] "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-1">
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-4 h-0.5 sm:w-5 sm:h-0.5 bg-white transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </div>
      </button>

      {/* Mobile/Tablet overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
                    fixed lg:static top-0 left-0 h-full bg-[#000000] flex flex-col items-center py-1 px-2 z-50
                    transition-transform duration-300 border-r border-[#383838]
                    w-16 sm:w-20 md:w-24 lg:w-[70px]
                    ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0
                `}
      >
        {/* Top logo */}
        <div className="flex flex-col items-center">
          <div className="mb-4 sm:mb-5.5 mt-2">
            <img
              src="/logoSquare.png"
              alt="logo"
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 object-cover object-center "
            />
          </div>
        </div>

        {/* Middle navigation */}
        <div className="flex flex-col items-center gap-y-4">
          {sidebarOptions.map((option) => (
            <SideBarIcon
              key={option.href}
              href={option.href}
              Icon={option.Icon}
              alt={option.alt}
              label={option.label}
              extraClass={option.extraClass}
            />
          ))}
          {/* Bottom DNA button */}
          <div className="w-[45px] h-[35px] sm:w-[50px] sm:h-[38px] md:w-[52px] md:h-[40px] lg:w-[54px] lg:h-[43px] bg-[#1C1E1F] font-bold text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-white flex items-center justify-center rounded-[8px] sm:rounded-[9px] md:rounded-[10px] lg:rounded-[11px]  cursor-pointer ">
            <span>DNA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
