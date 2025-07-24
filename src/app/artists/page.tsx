"use client";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  creator_name: string;
  description: string;
  profile_image_url?: string;
  tags?: string[];
  dna_visibility?: string;
  price?: number;
  license_type?: string;
  tracks_visibility?: string;
  become_partner?: boolean;
  audio_preview_url?: string;
  sensitivity?: number;
  status?: string;
  created_at?: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
        if (!backendUri) throw new Error("Backend URI not set");
        const res = await fetch(`${backendUri}/all-artists`);
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json();
        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
   <div className="min-h-screen bg-[#0e0e0f] p-4 sm:p-6 lg:p-8">
  <h1 className="text-2xl sm:text-3xl text-white font-bold mb-6 sm:mb-8 ml-12 sm:ml-16 lg:ml-0">
    Artists
  </h1>

  {error && <div className="text-red-500 mb-4">{error}</div>}

  {!loading && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {artists.length === 0 && !error && (
        <div className="col-span-full flex flex-col items-center justify-center w-full">
          <img
            src="/dummy.jpg"
            alt="No artists"
            className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-4 border border-[#383838]"
          />
          <span className="text-[#bdbdbd] text-base sm:text-lg">
            No artists found.
          </span>
        </div>
      )}

      {artists.map((artist) => (
        <div
          key={artist.id}
          className="relative border-[1px] border-purple-300 group rounded-2xl p-[2px] bg-gradient-to-l from-[rgb(16,16,16)] to-[#00000085] shadow-lg shadow-black/40 transition-transform hover:scale-[1.02] sm:hover:scale-[1.035] w-full max-w-[360px] mx-auto"
        >
          <div className="flex flex-col justify-between items-stretch h-[440px] rounded-[calc(1rem-2px)]  p-5 sm:p-6">
            {/* Header */}
            <div className="flex flex-col items-center mb-3">
              <img
                src="/dummy.jpg"
                alt={artist.creator_name}
                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-[#383838] shadow-lg"
              />
              <h2 className="text-2xl lg:text-3xl text-white font-extrabold mb-1 text-center truncate w-full">
                {artist.creator_name}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center w-full">
                {artist.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#232326] text-[#bdbdbd] text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-3 h-[72px] overflow-y-auto rounded-lg p-3 bg-[#232326] text-[#e0e0e0] text-sm font-semibold text-center custom-scrollbar">
              {artist.description}
            </div>

            {/* Attributes */}
            <div className="flex flex-col gap-1 text-white text-xs sm:text-sm mb-3">
              <div>
                DNA Visibility: <span className="font-semibold">{artist.dna_visibility}</span>
              </div>
              <div>
                Price: <span className="font-semibold">{artist.price ? `$${artist.price}` : "Free"}</span>
              </div>
              <div>
                License: <span className="font-semibold">{artist.license_type}</span>
              </div>
              <div>
                Status: <span className="font-semibold">{artist.status}</span>
              </div>
            </div>

            {/* Footer */}
            {artist.audio_preview_url && (
              <div className="mt-auto text-center">
                <a
                  href={artist.audio_preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A78BFA] text-xs sm:text-sm underline break-all truncate block"
                >
                  {artist.audio_preview_url}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Custom scrollbar */}
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      background: #232326;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #5e5e5e;
      border-radius: 6px;
    }
  `}</style>
</div>
  );
} 