"use client";
import Card from "@/components/Card";
import Topbar from "@/components/topbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full bg-[#0e0e0f]">
      
      <div className="flex flex-col flex-1 min-h-screen ">
        <Topbar />

        <main className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[96px] py-4 sm:py-6 gap-4 sm:gap-6 font-sans max-w-full  md:min-h-[calc(100vh-200px)] lg:justify-start lg:min-h-0">
          <Card>
            <h2 className=" text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[22px] sm:leading-[25px] md:leading-[28px] lg:leading-[30px] font-grotesk" >
              Verify your creator identity → Unlock your DNA
            </h2>
            <p className="text-[#9f9f9f] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[17px] sm:leading-[18px] md:leading-[19px] lg:leading-[20px] mt-2 font-sans">
              Simply claim your profile, and we'll build your DNA automatically.
              Are you a creator with music already on Spotify, YouTube etc?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button className="font-medium bg-[#007d49] text-white w-full sm:w-[200px] md:w-[220px] lg:w-[240px] h-[44px] sm:h-[48px] lg:h-[56px] rounded-full text-[13px] sm:text-[14px] lg:text-[16px] hover:bg-green-700 transition cursor-pointer">
                Claim your profile
              </button>
              <button className="font-medium bg-[#363636] text-white w-full sm:w-[200px] md:w-[220px] lg:w-[240px] h-[44px] sm:h-[48px] lg:h-[56px] rounded-full text-[13px] sm:text-[14px] lg:text-[16px] hover:bg-[#444] transition border border-[#383838] cursor-pointer">
                This doesn't apply to me
              </button>
            </div>
          </Card>

          <Card>
            <h2 className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[22px] sm:leading-[25px] md:leading-[28px] lg:leading-[30px] font-grotesk">
              Build DNA by Uploading Audio Tracks
            </h2>
            <p className="text-[#9f9f9f] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[17px] sm:leading-[18px] md:leading-[19px] lg:leading-[20px] mt-2">
              You can upload your music, and build your Sonic DNA. Please note
              that by default all DNAs remain private.
            </p>
            <ul className="pl-2 text-[#9f9f9f] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] leading-[15px] sm:leading-[16px] md:leading-[17px] lg:leading-[18px] mt-2 space-y-1">
              <li className="flex items-start">
                <span className="text-white mr-2 mt-0.5">•</span>
                <span>
                  <span className="text-white">Build with AI</span>: With this,
                  AI will take care of captions, categorisations, tags.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2 mt-0.5">•</span>
                <span>
                  <span className="text-white">Build Manually</span>: You'll
                  have to manually add captions, categorisations and tags.
                </span>
              </li>
            </ul>
            <button
              onClick={() => {
                router.push("/upload-audio");
              }}
              className="bg-[#007d49] text-white w-full sm:w-[200px] md:w-[220px] lg:w-[240px] h-[44px] sm:h-[48px] lg:h-[56px] rounded-full text-[13px] sm:text-[14px] lg:text-[16px] hover:bg-green-700 transition mt-4 sm:mt-5 cursor-pointer font-medium"
              
            >
              Upload audio
            </button>
          </Card>
        </main>
      </div>
    </div>
  );
}
