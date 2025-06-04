"use client";

import { useState, useEffect } from "react";
import { fetchAPI, formatDate } from "@/lib/strapi";
import Link from "next/link";

interface Resource {
  id: number;
  attributes: {
    title: string;
    description: string;
    published: string;
    author: string;
    type: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function HubResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [apiUrl, setApiUrl] = useState<string>("");

  useEffect(() => {
    // Get the API URL from environment variable
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
    setApiUrl(strapiUrl);

    const getResources = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching resources from Strapi at:", strapiUrl);

        // Re-enable the actual API call for debugging
        try {
          const response = await fetchAPI("/resources", {
            populate: "*",
            sort: ["published:desc"],
            pagination: {
              page: 1,
              pageSize: 10,
            },
          });

          console.log("Strapi response:", response);
          setDebugInfo(response);

          if (response.data && response.data.length > 0) {
            console.log("Setting resources from Strapi:", response.data);
            setResources(response.data);
            setUseFallback(false);
          } else {
            console.log("No resources found in Strapi, using fallback data");
            setUseFallback(true);
            // Use fallback data if no resources are returned
            setResources(getFallbackResources());
          }
        } catch (apiError: any) {
          console.error("API call error:", apiError);
          setDebugInfo({
            error: apiError?.message || "Unknown API error",
            stack: apiError?.stack || "No stack trace available",
          });
          throw apiError; // Re-throw to be caught by the outer catch
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching resources from Strapi:", error);
        setError("Failed to load resources. Please try again later.");
        setIsLoading(false);
        setUseFallback(true);

        // Fallback to hardcoded data if Strapi is not available
        setResources(getFallbackResources());
      }
    };

    getResources();
  }, []);

  // Function to get fallback resources
  const getFallbackResources = (): Resource[] => {
    console.log("Using fallback hardcoded resources");
    return [
      {
        id: 1,
        attributes: {
          title: "Hello World",
          description:
            "A simple Hello World document created in the Hub Dashboard.",
          published: "2024-05-15T00:00:00.000Z",
          author: "KITESTUDIOS Team",
          type: "DOCUMENT",
          slug: "hello-world",
          createdAt: "2024-05-15T00:00:00.000Z",
          updatedAt: "2024-05-15T00:00:00.000Z",
        },
      },
      {
        id: 2,
        attributes: {
          title: "KITESTUDIOS Design System Overview",
          description:
            "Comprehensive documentation of our design system including typography, colors, and components.",
          published: "2024-04-15T00:00:00.000Z",
          author: "Thomas Kite",
          type: "DOCUMENT",
          slug: "design-system-overview",
          createdAt: "2024-04-15T00:00:00.000Z",
          updatedAt: "2024-04-15T00:00:00.000Z",
        },
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="ok_yj5y">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-black p-6 rounded-lg border border-gray-800 animate-pulse"
            data-oid="5de9_bu"
          >
            <div
              className="h-6 bg-gray-800 rounded w-1/4 mb-2"
              data-oid="g9v7v_t"
            ></div>
            <div
              className="h-8 bg-gray-800 rounded w-3/4 mb-4"
              data-oid="3uhaidj"
            ></div>
            <div
              className="h-4 bg-gray-800 rounded w-full mb-2"
              data-oid="be5cwqm"
            ></div>
            <div
              className="h-4 bg-gray-800 rounded w-2/3 mb-6"
              data-oid="v6_s:y5"
            ></div>
            <div
              className="h-5 bg-gray-800 rounded w-1/3"
              data-oid="ihse20x"
            ></div>
          </div>
        ))}
      </div>
    );
  }

  if (error && resources.length === 0) {
    return (
      <div
        className="p-4 bg-red-900 text-red-200 rounded-md"
        data-oid="2yoi56z"
      >
        <p data-oid="rv9pex_">{error}</p>
        {debugInfo && (
          <div
            className="mt-4 p-4 bg-gray-900 rounded-md overflow-auto max-h-60"
            data-oid="l716379"
          >
            <pre className="text-xs text-gray-300" data-oid="g60ezv3">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="x1slf:1">
      {useFallback && (
        <div
          className="col-span-2 mb-4 p-4 bg-yellow-900/50 text-yellow-200 rounded-md"
          data-oid="-tcowzn"
        >
          <p data-oid="pt:0upo">
            ⚠️ Using fallback data. Make sure your Strapi server is running and
            resources are published.
          </p>
          <p className="mt-1 text-sm" data-oid="at5a0z9">
            API URL: {apiUrl || "Not set"}
          </p>
          {debugInfo && (
            <details className="mt-2" data-oid="tr.k_gf">
              <summary className="cursor-pointer text-sm" data-oid="4tqez28">
                Show debug info
              </summary>
              <div
                className="mt-2 p-2 bg-gray-900 rounded-md overflow-auto max-h-60"
                data-oid="xduh_o6"
              >
                <pre className="text-xs text-gray-300" data-oid="tp227f_">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            </details>
          )}
        </div>
      )}

      {resources.map((resource) => (
        <Link
          href={`/resource/${resource.attributes.slug}`}
          key={resource.id}
          className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
          data-oid="ecu6_fm"
        >
          <div
            className="flex items-center justify-between mb-2"
            data-oid="bxbmpts"
          >
            <div className="flex items-center space-x-2" data-oid=".4u9ear">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                data-oid="eks.._c"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                  data-oid="rytxju1"
                />
              </svg>
              <span className="text-sm text-gray-400" data-oid="g37b8bz">
                {resource.attributes.type}
              </span>
            </div>
            <span className="text-sm text-gray-400" data-oid="k-09dx7">
              {new Date(resource.attributes.published)
                .toISOString()
                .split("T")[0]
                .replace(/-/g, "-")}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2" data-oid="dfbps:u">
            {resource.attributes.title}
          </h3>
          <p className="text-gray-300 mb-4" data-oid="0i70dah">
            {resource.attributes.description}
          </p>

          <div className="flex items-center space-x-2" data-oid="bt78ch-">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              data-oid="v.jyod-"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
                data-oid="h9kwywg"
              />
            </svg>
            <span className="text-sm text-gray-400" data-oid="fwzcg9h">
              {resource.attributes.author}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
