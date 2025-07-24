import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Howl } from "howler";
import { useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import Image from "next/image";
import { UploadIcon } from "lucide-react";

interface Step1UploadProps {
  onUploadSuccess: () => void;
}

export default function Step1Upload({ onUploadSuccess }: Step1UploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentHowl, setCurrentHowl] = useState<Howl | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    }
  }, []);

  const playAudio = (file: File, index: number) => {
    if (currentHowl) {
      currentHowl.stop();
      setCurrentHowl(null);
      setPlayingIndex(null);
    }
    const fileURL = URL.createObjectURL(file);
    const sound = new Howl({
      src: [fileURL],
      html5: true,
      onend: () => {
        setPlayingIndex(null);
      },
    });
    sound.play();
    setCurrentHowl(sound);
    setPlayingIndex(index);
  };

  const stopAudio = () => {
    if (currentHowl) {
      currentHowl.stop();
      setCurrentHowl(null);
      setPlayingIndex(null);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    if (playingIndex === indexToRemove) {
      stopAudio();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/x-aiff": [".aif", ".aiff"],
      "audio/ogg": [".ogg"],
      "audio/flac": [".flac"],
      "audio/aac": [".aac"],
    },
    multiple: true,
  });

  return (
    <section className="w-full max-w-[1200px]">
      <div className="mb-2 sm:mb-[10px]">
        <span className="text-[#9f9f9f] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-sans">Step 1</span>
      </div>
      <h2 className="text-white text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[32px] font-grotesk font-[450] mb-4 sm:mb-5 md:mb-6 lg:mb-[20px] xl:mb-[30px]">Upload Audio</h2>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 w-full">
        
        <div className="flex-1 lg:flex-[0_0_70%] w-full lg:w-[70%]">
          <div className="flex flex-col items-center justify-center border border-[#383838] rounded-[12px] sm:rounded-[16px] md:rounded-[18px] lg:rounded-[20px] bg-gradient-to-r from-[#181A1C] to-[#0B0C0D] pt-6 sm:pt-8 md:pt-10 lg:pt-12 xl:pt-[64px] px-4 sm:px-6 md:px-7 lg:px-8 xl:px-[32px] cursor-pointer transition hover:bg-[#18181a] shadow-lg min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[340px] max-h-[240px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[320px] xl:max-h-[340px] w-full p-4 sm:p-5 md:p-6 lg:p-8 xl:p-[32px]">
            <div {...getRootProps()} className="w-full flex flex-col items-center">
              <input {...getInputProps()} />
              <UploadIcon className="w-12 h-12 text-[#6A35EE] mb-4" />
              <div className="text-center">
                <div className="text-white text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold font-sans  px-2">
                  {isDragActive ? "Drop the audio files here..." : "Choose audio file(s)/ folder(s) or drag it here"}
                </div>
                <div className="text-[#828181] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] font-sans mb-4 sm:mb-5 md:mb-6 lg:mb-8">Supported formats: .mp3, .wav, .aac, .ogg, .flac</div>
              </div>
              <button
                className="bg-[#6A35EE] text-white w-full sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] h-[36px] sm:h-[38px] md:h-[40px] lg:h-[42px] xl:h-[44px] rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-sans font-semibold hover:bg-[#6a38d9] transition mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-[32px]"
                type="button"
              >
                Upload audio file(s)
              </button>
              <p className="text-[#828181] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] font-sans text-center max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mb-3 sm:mb-4 lg:mb-[16px] px-2">
                By uploading files, you agree that you have the ownership and authority to upload them.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Uploaded Files Preview - Full width on mobile, 30% on desktop */}
        <div className="flex-1 lg:flex-[0_0_30%] w-full lg:w-[30%]">
          {uploadedFiles.length > 0 && (
            <div className="w-full border border-[#383838] rounded-[12px] sm:rounded-[14px] p-3 sm:p-4 shadow-md min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[340px] max-h-[240px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[320px] xl:max-h-[340px] overflow-y-auto bg-gradient-to-r from-[#181A1C] to-[#0B0C0D]">
              <h3 className="text-white text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold mb-2 sm:mb-3 border-b border-[#383838] pb-2">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="bg-[#232326] rounded-xl p-3 sm:p-4 border border-[#383838] flex flex-col gap-2 shadow-sm transition hover:border-[#6A35EE]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] rounded-lg bg-[#181A1C] flex items-center justify-center overflow-hidden border border-[#383838]">
                        <Image
                          src="/audio-file-icon.png"
                          alt="Audio file"
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-white text-[12px] sm:text-[13px] md:text-[14px] font-medium truncate block"
                          title={file.name}
                        >
                          {file.name}
                        </span>
                        <span className="text-[#828181] text-[10px] sm:text-[11px] md:text-[12px] block">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-[#828181] hover:text-red-400 text-base transition flex-shrink-0 ml-2"
                        title="Remove file"
                        aria-label="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {playingIndex === idx ? (
                        <button
                          onClick={stopAudio}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-[11px] sm:text-[12px] px-3 py-1 rounded-full transition shadow"
                          aria-label="Stop audio"
                        >
                          <FaStop size={14} />
                          <span className="hidden sm:inline">Stop</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => playAudio(file, idx)}
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] sm:text-[12px] px-3 py-1 rounded-full transition shadow"
                          aria-label="Play audio"
                        >
                          <FaPlay size={14} />
                          <span className="hidden sm:inline">Play</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) }
        </div>
      </div>
    </section>
  );
}