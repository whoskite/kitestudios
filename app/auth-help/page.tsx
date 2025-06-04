"use client";

import { useState, useEffect } from "react";
import OffWhiteNav from "@/components/OffWhiteNav";
import Link from "next/link";
import { Copy, Check, AlertTriangle } from "lucide-react";

export default function AuthHelpPage() {
  const [baseUrl, setBaseUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get the base URL in the client
    setBaseUrl(window.location.origin);
  }, []);

  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-wrapper" data-oid="frmc9tx">
      <OffWhiteNav data-oid="c4zg8_p" />
      <div
        className="min-h-screen bg-white dark:bg-black off-white-grid py-20"
        data-oid="x531yz6"
      >
        <div className="container mx-auto px-4 pt-16" data-oid="3h0dxgf">
          <div className="max-w-3xl mx-auto" data-oid="1fthsx7">
            <h1
              className="text-3xl font-bold mb-8 industrial-text"
              data-oid="49aun4j"
            >
              GOOGLE OAUTH CONFIGURATION
            </h1>

            <div
              className="border-2 border-black dark:border-white p-8 mb-8"
              data-oid="qks40to"
            >
              <div className="flex items-center mb-4" data-oid="u1rgyb4">
                <AlertTriangle
                  className="h-6 w-6 mr-2 text-red-500"
                  data-oid="llgkcn:"
                />

                <h2 className="text-xl font-bold" data-oid="grwhoky">
                  Sign-in Error
                </h2>
              </div>

              <p className="mb-4" data-oid="elevdm3">
                There was a problem signing in with Google. This could be due to
                one of the following reasons:
              </p>

              <ul className="list-disc pl-5 mb-6 space-y-2" data-oid="d_x:8nk">
                <li data-oid="sc-km:l">
                  The Google OAuth configuration is incorrect
                </li>
                <li data-oid="f.j5103">
                  Your email is not in the allowed list
                </li>
                <li data-oid=":4ls0ry">There's a network issue</li>
                <li data-oid="q1-cqgy">
                  The redirect URI doesn't match what's configured in Google
                  Cloud Console
                </li>
              </ul>

              <h3 className="text-lg font-bold mt-6 mb-2" data-oid="ztk3wpt">
                Your Redirect URI:
              </h3>
              <div className="flex items-center mb-6" data-oid="glxogqf">
                <code
                  className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm flex-grow"
                  data-oid="q6gmsy-"
                >
                  {redirectUri}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 p-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  data-oid="c-sc306"
                >
                  {copied ? (
                    <Check className="h-5 w-5" data-oid="f:ji6wx" />
                  ) : (
                    <Copy className="h-5 w-5" data-oid="vw62tpl" />
                  )}
                </button>
              </div>

              <h3 className="text-lg font-bold mt-6 mb-2" data-oid="e7kn331">
                Steps to fix:
              </h3>
              <ol className="list-decimal pl-5 space-y-2" data-oid="q7hzv6g">
                <li data-oid="_j.rvwh">
                  Go to the{" "}
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                    data-oid="mzfaa.4"
                  >
                    Google Cloud Console
                  </a>
                </li>
                <li data-oid="g0fc969">Select your project</li>
                <li data-oid="2._1gt:">Go to "Credentials"</li>
                <li data-oid=".n.kbc0">Edit your OAuth 2.0 Client ID</li>
                <li data-oid="5z4gfb7">
                  Add the above URI to "Authorized redirect URIs"
                </li>
                <li data-oid="mpz1.u.">Click "Save"</li>
              </ol>

              <div
                className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500"
                data-oid="te.xctw"
              >
                <h4 className="font-bold" data-oid="a7esrxi">
                  Important:
                </h4>
                <p data-oid="7ms2r06">
                  Make sure to also add these URIs to your "Authorized
                  JavaScript origins":
                </p>
                <ul className="list-disc pl-5 mt-2" data-oid="6862o4s">
                  <li data-oid="6x0jz00">
                    <code
                      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm"
                      data-oid="1gqy8qd"
                    >
                      {baseUrl}
                    </code>
                  </li>
                  <li data-oid="9::m9v:">
                    Any other domains where your app will run
                  </li>
                </ul>
              </div>

              <div
                className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500"
                data-oid="qlr:qbt"
              >
                <h4 className="font-bold" data-oid="xav:51j">
                  Try clearing your cookies:
                </h4>
                <p data-oid="w28r9fp">
                  Sometimes authentication issues can be resolved by clearing
                  your browser cookies and cache.
                </p>
              </div>
            </div>

            <div className="flex justify-between" data-oid="0tp9pgu">
              <Link
                href="/"
                className="border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                data-oid="o5heij:"
              >
                Back to Home
              </Link>
              <Link
                href="/admin"
                className="border-2 border-black dark:border-white px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-colors"
                data-oid="n4a3yrk"
              >
                Try Login Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
