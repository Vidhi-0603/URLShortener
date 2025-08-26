import React, { useState } from "react";
import { Copy, ExternalLink, Calendar, Check } from "lucide-react";
import { getAllUserUrls } from "../api/auth.api.js";
import { useQuery } from "@tanstack/react-query";

const URLDashboard = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  });
    
    console.log({ urls });

  const [copiedId, setCopiedId] = useState(null);

  // Sample data - in a real app this would come from an API or props
//   const [urls] = useState([
//     {
//       id: 1,
//       originalUrl:
//         "https://www.example.com/very-long-url-that-needs-shortening",
//       shortUrl: "https://short.ly/abc123",
//       createdAt: "2024-08-20",
//       clicks: 245,
//     },
//     {
//       id: 2,
//       originalUrl: "https://github.com/user/repository/blob/main/readme.md",
//       shortUrl: "https://short.ly/xyz789",
//       createdAt: "2024-08-19",
//       clicks: 89,
//     },
//     {
//       id: 3,
//       originalUrl: "https://docs.google.com/document/d/1234567890/edit",
//       shortUrl: "https://short.ly/doc456",
//       createdAt: "2024-08-18",
//       clicks: 156,
//     },
//     {
//       id: 4,
//       originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//       shortUrl: "https://short.ly/yt999",
//       createdAt: "2024-08-17",
//       clicks: 1337,
//     },
//   ]);

  const copyToClipboard = async (text, id, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(`${id}-${type}`);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    };
    
    if (isLoading) {
      return (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
          Error loading your URLs: {error.message}
        </div>
      );
    }

    if (!urls.urls || urls.urls.length === 0) {
      return (
        <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          <p className="text-lg font-medium">No URLs found</p>
          <p className="mt-1">You haven't created any shortened URLs yet.</p>
        </div>
      );
    }


  const truncateUrl = (url, maxLength = 40) => {
    return url.length > maxLength ? url.substring(0, maxLength) + "..." : url;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">URL Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your shortened URLs
          </p>
        </div>

        {/* URLs List */}
        <div className="divide-y divide-gray-200">
          {urls.urls.reverse().map((url) => (
            <div
              key={url._id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* URL Info */}
                <div className="flex-1 min-w-0">
                  {/* Original URL */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Original URL
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-mono text-sm break-all lg:break-normal">
                        <span className="hidden truncate max-w-xs lg:inline">
                          {url.full_url.length > 40
                            ? url.full_url.slice(0, 39) + "..."
                            : url.full_url}{" "}
                        </span>
                        <span className="lg:hidden">
                          {truncateUrl(url.full_url, 30)}
                        </span>
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(url.full_url, url._id, "original")
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        title="Copy original URL"
                      >
                        {copiedId === `${url._id}-original` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Short URL */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-blue-600">
                        Short URL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-mono text-sm hover:underline cursor-pointer">
                        {`http://localhost:3000/${url.short_url}`}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `http://localhost:3000/${url.short_url}`,
                            url._id,
                            "short"
                          )
                        }
                        className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        title="Copy short URL"
                      >
                        {copiedId === `${url._id}-short` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{url.clicks} clicks</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 lg:flex-col lg:gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(url.full_url, url._id, "original-btn")
                    }
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2 flex-1 lg:flex-none justify-center"
                  >
                    {copiedId === `${url._id}-original-btn` ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy Original</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `http://localhost:3000/${url.short_url}`,
                        url._id,
                        "short-btn"
                      )
                    }
                    className="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center gap-2 flex-1 lg:flex-none justify-center"
                  >
                    {copiedId === `${url._id}-short-btn` ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy Short</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <span>Total URLs: {urls.urls.length}</span>
            <span>
              Total Clicks:{" "}
              {urls.urls.reduce((sum, url) => sum + url.clicks, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLDashboard;
