"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import OffWhiteNav from "@/components/OffWhiteNav";
import {
  FileText,
  Github,
  Video,
  FileIcon,
  Plus,
  Edit,
  Trash2,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";

// Mock resources (in a real app, fetch from API)
interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "github" | "document" | "idea" | "other" | "audio";
  slug: string;
  date: string;
  author: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "document" as const,
    slug: "",
    content: "",
  });

  // Fetch resources when session is available
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      // Fetch resources (mock for now)
      setResources([
        {
          id: "1",
          title: "KITESTUDIOS Design System Overview",
          description: "Comprehensive documentation of our design system.",
          type: "document",
          slug: "design-system-overview",
          date: "2024-04-15",
          author: "KITESTUDIOS Design Team",
        },
        {
          id: "2",
          title: "Gallery 82 GitHub Repository",
          description: "Main repository for the Gallery 82 project.",
          type: "github",
          slug: "gallery-82-github",
          date: "2024-04-20",
          author: "KITESTUDIOS Development Team",
        },
        {
          id: "3",
          title: "Studio Session: Design Process",
          description: "Behind-the-scenes video of our design process.",
          type: "video",
          slug: "studio-session-design-process",
          date: "2024-04-25",
          author: "KITESTUDIOS Media Team",
        },
      ]);
    }

    setIsLoading(false);
  }, [status, session]);

  // Handle login with Google
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/admin" });
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  // Mock resource creation (in a real app, call API)
  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !newResource.title ||
      !newResource.description ||
      !newResource.type ||
      !newResource.slug
    ) {
      alert("Please fill out all required fields");
      return;
    }

    // In a real app, this would call an API endpoint
    const newId = (resources.length + 1).toString();
    const createdResource: Resource = {
      id: newId,
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      slug: newResource.slug,
      date: new Date().toISOString().split("T")[0],
      author: session?.user?.name || "Unknown",
    };

    setResources([...resources, createdResource]);
    setIsAddingResource(false);
    setNewResource({
      title: "",
      description: "",
      type: "document",
      slug: "",
      content: "",
    });
  };

  // Mock resource deletion (in a real app, call API)
  const handleDeleteResource = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      // In a real app, this would call an API endpoint
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  // Loading state
  if (isLoading || status === "loading") {
    return (
      <div className="page-wrapper" data-oid="am4won0">
        <OffWhiteNav data-oid="vuhllah" />
        <div
          className="min-h-screen bg-white dark:bg-black off-white-grid py-20"
          data-oid="2z_0e.n"
        >
          <div className="container mx-auto px-4" data-oid="1ixnlnx">
            <div
              className="border-2 border-black dark:border-white p-12 flex items-center justify-center"
              data-oid="8rf8m04"
            >
              <div className="text-2xl font-bold" data-oid="x-sd0qs">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (status === "unauthenticated" || !session) {
    return (
      <div className="page-wrapper" data-oid="kubwl-_">
        <OffWhiteNav data-oid="z33xsr:" />
        <div
          className="min-h-screen bg-white dark:bg-black off-white-grid py-20"
          data-oid="b:acceu"
        >
          <div className="container mx-auto px-4" data-oid="v0jvbeg">
            <div
              className="border-2 border-black dark:border-white p-12"
              data-oid="p13o:nd"
            >
              <h1
                className="text-3xl font-bold mb-8 industrial-text"
                data-oid="n76hkjq"
              >
                RESOURCE HUB ADMIN
              </h1>

              <div className="mb-8" data-oid="fdx8gsj">
                <p className="mb-4" data-oid="ut7nnja">
                  You need to be authenticated to access the admin panel.
                </p>

                <button
                  onClick={handleLogin}
                  className="flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  data-oid="em8iu2x"
                >
                  <LogIn className="mr-2 h-4 w-4" data-oid="jjbon6n" /> Sign in
                  with Google
                </button>
              </div>

              <div
                className="mt-8 pt-8 border-t-2 border-black dark:border-white"
                data-oid="8ocjmdf"
              >
                <Link
                  href="/hub"
                  className="text-sm hover:underline"
                  data-oid="5p194qy"
                >
                  Return to Resource Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin interface
  return (
    <div className="page-wrapper" data-oid="yfzaa1o">
      <OffWhiteNav data-oid="9hxpepn" />
      <div
        className="min-h-screen bg-white dark:bg-black off-white-grid py-20"
        data-oid="ihph576"
      >
        <div className="container mx-auto px-4" data-oid="_4-ln2a">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            data-oid="_5gbk:-"
          >
            <h1
              className="text-3xl font-bold mb-4 md:mb-0 industrial-text"
              data-oid="a:tg9pb"
            >
              RESOURCE HUB ADMIN
            </h1>

            <div className="flex items-center" data-oid="8cwkdtc">
              <div className="mr-4 flex items-center" data-oid="bs44ou0">
                <img
                  src={session.user.image || "https://via.placeholder.com/40"}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full mr-2 border-2 border-black dark:border-white"
                  data-oid="gib82r6"
                />

                <span className="text-sm font-bold" data-oid="ia5kpf-">
                  {session.user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                data-oid="hrng_fw"
              >
                <LogOut className="h-4 w-4" data-oid="k2a9rn9" />
              </button>
            </div>
          </div>

          <div className="mb-8" data-oid="etyfr_j">
            <div
              className="flex justify-between items-center mb-4"
              data-oid="qug1opi"
            >
              <h2 className="text-xl font-bold" data-oid="1y6ci1s">
                Resources
              </h2>

              <button
                onClick={() => setIsAddingResource(!isAddingResource)}
                className="flex items-center border-2 border-black dark:border-white px-3 py-1 text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                data-oid="gw.twm9"
              >
                {isAddingResource ? (
                  "Cancel"
                ) : (
                  <>
                    <Plus className="mr-1 h-4 w-4" data-oid="t025hu2" /> Add
                    Resource
                  </>
                )}
              </button>
            </div>

            {isAddingResource && (
              <div
                className="border-2 border-black dark:border-white p-6 mb-6"
                data-oid="3xu.s:6"
              >
                <h3 className="text-lg font-bold mb-4" data-oid="ji4u5q8">
                  Add New Resource
                </h3>

                <form onSubmit={handleCreateResource} data-oid="3icfrp.">
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                    data-oid="kh_rj_4"
                  >
                    <div data-oid="n-vd9-:">
                      <label
                        className="block text-sm font-bold mb-2"
                        data-oid="hl84buc"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={newResource.title}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            title: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                        data-oid="ft4gf9."
                      />
                    </div>

                    <div data-oid="omgsqph">
                      <label
                        className="block text-sm font-bold mb-2"
                        data-oid="lzyri3b"
                      >
                        Slug
                      </label>
                      <input
                        type="text"
                        value={newResource.slug}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            slug: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                        data-oid="95thl9g"
                      />
                    </div>

                    <div data-oid="8mwh4bx">
                      <label
                        className="block text-sm font-bold mb-2"
                        data-oid="quwjc6n"
                      >
                        Type
                      </label>
                      <select
                        value={newResource.type}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                        data-oid="l2y44-v"
                      >
                        <option value="document" data-oid="fl9n6o4">
                          Document
                        </option>
                        <option value="github" data-oid="56lm17e">
                          GitHub
                        </option>
                        <option value="video" data-oid="qvl9q6t">
                          Video
                        </option>
                        <option value="idea" data-oid="eovvl7s">
                          Idea
                        </option>
                        <option value="other" data-oid="at43o-p">
                          Other
                        </option>
                      </select>
                    </div>

                    <div data-oid=".18ajoy">
                      <label
                        className="block text-sm font-bold mb-2"
                        data-oid="a85os.o"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        value={newResource.description}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            description: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black dark:border-white bg-transparent p-2"
                        required
                        data-oid="d8g0:fx"
                      />
                    </div>
                  </div>

                  <div className="mb-4" data-oid="6979bln">
                    <label
                      className="block text-sm font-bold mb-2"
                      data-oid="l:18t:5"
                    >
                      Content (Markdown)
                    </label>
                    <textarea
                      value={newResource.content}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          content: e.target.value,
                        })
                      }
                      className="w-full border-2 border-black dark:border-white bg-transparent p-2 h-40"
                      required
                      data-oid="iy1baaf"
                    />
                  </div>

                  <div className="flex justify-end" data-oid="-q:f3vg">
                    <button
                      type="submit"
                      className="flex items-center border-2 border-black dark:border-white px-4 py-2 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      data-oid="tzs682y"
                    >
                      <Plus className="mr-2 h-4 w-4" data-oid="q5y97ig" />{" "}
                      Create Resource
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div
              className="border-2 border-black dark:border-white"
              data-oid="s.j4_qa"
            >
              <div
                className="grid grid-cols-12 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase py-2 px-4"
                data-oid="us1e04m"
              >
                <div className="col-span-1" data-oid="izcp4s:">
                  Type
                </div>
                <div className="col-span-3" data-oid="09q0vmo">
                  Title
                </div>
                <div className="col-span-3" data-oid=":7lgw56">
                  Slug
                </div>
                <div className="col-span-2" data-oid="4pl7d7i">
                  Date
                </div>
                <div className="col-span-2" data-oid="3_9dyo-">
                  Author
                </div>
                <div className="col-span-1" data-oid="ik9zyc2">
                  Actions
                </div>
              </div>

              {resources.length === 0 ? (
                <div className="p-8 text-center" data-oid="m.s9l3r">
                  <p data-oid="1y2kgbd">
                    No resources found. Add your first resource to get started.
                  </p>
                </div>
              ) : (
                resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="grid grid-cols-12 items-center py-3 px-4 border-t border-black dark:border-white"
                    data-oid="d2k3yik"
                  >
                    <div className="col-span-1" data-oid="gi2fmif">
                      {resource.type === "document" && (
                        <FileText className="h-5 w-5" data-oid="oq0nin:" />
                      )}
                      {resource.type === "github" && (
                        <Github className="h-5 w-5" data-oid="gj-3ve0" />
                      )}
                      {resource.type === "video" && (
                        <Video className="h-5 w-5" data-oid="tda2.of" />
                      )}
                      {resource.type === "idea" && (
                        <FileIcon className="h-5 w-5" data-oid="3yidmd1" />
                      )}
                    </div>
                    <div
                      className="col-span-3 font-bold truncate"
                      data-oid="p.2py1:"
                    >
                      {resource.title}
                    </div>
                    <div
                      className="col-span-3 text-sm truncate"
                      data-oid="rmsnxei"
                    >
                      {resource.slug}
                    </div>
                    <div className="col-span-2 text-sm" data-oid=":hw22kg">
                      {resource.date}
                    </div>
                    <div
                      className="col-span-2 text-sm truncate"
                      data-oid="awwvmic"
                    >
                      {resource.author}
                    </div>
                    <div
                      className="col-span-1 flex space-x-2"
                      data-oid="5l0.9g."
                    >
                      <Link
                        href={`/admin/edit/${resource.id}`}
                        className="p-1 hover:text-[#ffff00]"
                        data-oid="n3ym1kt"
                      >
                        <Edit className="h-4 w-4" data-oid="i-m8w.7" />
                      </Link>
                      <button
                        onClick={() => handleDeleteResource(resource.id)}
                        className="p-1 hover:text-red-500"
                        data-oid="rj.uxy1"
                      >
                        <Trash2 className="h-4 w-4" data-oid="q7xo3zc" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className="mt-8 pt-8 border-t-2 border-black dark:border-white"
            data-oid="kckmefl"
          >
            <Link
              href="/hub"
              className="text-sm hover:underline"
              data-oid="nq:ctay"
            >
              Return to Resource Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
