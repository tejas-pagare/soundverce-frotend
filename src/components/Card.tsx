import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (  
    <div
    className="border border-[#383838] rounded-xl pt-5 sm:pt-6 lg:pt-[28px] px-4 sm:px-6 md:px-8 lg:px-[40px] pb-5 sm:pb-6 lg:pb-[32px] w-full max-w-[1169px] bg-[#00000085]"
    >
      {children}
    </div>
  );
}
