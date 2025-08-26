import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { createShortUrl } from "../api/shortUrl.api.js";
import { useSelector } from "react-redux";

const ShortUrl = () => {
  const [url, setUrl] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const short_url = await createShortUrl(
        url,
        customUrl.trim() === "" ? null : customUrl
      );

      setShortUrl(short_url);
      // queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const resetForm = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);
  };

  return (
    <>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="https://example.com/your-very-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>
        {isLoggedIn && (
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your custom URL
            </label>
            <input
              id="url"
              type="url"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
              }}
              placeholder="custom url text e.g.: mycustomUrl"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              // onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          //   disabled={isLoading || !url.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {" "}
          Shorten Url
        </button>
      </div>

      {shortUrl && (
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 mb-2">Your shortened URL:</p>
            <div className="flex items-center bg-white rounded-md p-3 border">
              <span className="flex-1 text-indigo-600 font-medium truncate">
                {shortUrl}
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Shorten Another URL
          </button>
        </div>
      )}
    </>
  );
};

export default ShortUrl;
