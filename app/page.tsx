import Image from "next/image"
import Link from "next/link"
import { getLatestProjects } from "@/lib/db"
import { getAllProjects } from "@/lib/db"
import { YouTubeEmbed } from "@/components/youtube-embed"

export default async function Home() {
  const latestProjects = await getLatestProjects(3)
  const allProjects = await getAllProjects()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6">Personal Portfolio</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* About Me Section */}
        <div className="space-y-4 text-white">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">About Me</div>
          </div>
          <div className="bg-black bg-opacity-70 backdrop-blur-sm p-5 rounded-lg">
            <p className="text-gray-300">
              I am an experienced software engineer specializing in Unity3D and C# with a strong background in
              developing real-time 3D graphics, cross-platform applications, and XR (AR/VR) experiences. I'm passionate
              about advancing XR technologies and creating immersive experiences for cutting-edge platforms like Meta
              Quest, Apple Vision Pro, and HoloLens.
            </p>
          </div>
        </div>

        {/* Professional Areas Section */}
        <div className="space-y-5 text-white">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Professional Areas</div>
            <Link href="/professional-areas" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All Areas
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3D Design */}
            <Link
              href="/professional-area/3d-design"
              className="rounded-lg border border-border bg-black bg-opacity-70 backdrop-blur-sm p-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-row h-full">
                <div className="relative w-1/3 h-auto overflow-hidden rounded-lg flex-shrink-0">
                  <YouTubeEmbed
                    videoId="TXhAasKKn2Y"
                    title="3D Design"
                    className="absolute top-0 left-0 h-full w-full pt-0"
                    autoplay={true}
                  />
                </div>
                <div className="flex flex-col ml-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-primary">3D Design</h3>
                  <p className="text-gray-300 mb-2 text-sm flex-grow">
                    Explore 3D modeling, animation, and visualization projects created with various tools including
                    Blender, Cinema4D, and Maya.
                  </p>
                  <div className="mt-auto flex items-center text-primary text-sm">
                    View Projects <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Game Design */}
            <Link
              href="/professional-area/game-design"
              className="rounded-lg border border-border bg-black bg-opacity-70 backdrop-blur-sm p-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-row h-full">
                <div className="relative w-1/3 h-auto overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/a6bb8867-4eff-423a-8fd0-adeb4702dcb5/Menu+Scene+2.jpg?format=2500w"
                    alt="Game Design"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col ml-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-primary">Game Design</h3>
                  <p className="text-gray-300 mb-2 text-sm flex-grow">
                    Interactive game development projects featuring puzzle mechanics, procedural tools, and
                    narrative-driven experiences.
                  </p>
                  <div className="mt-auto flex items-center text-primary text-sm">
                    View Projects <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Full Stack Development */}
            <Link
              href="/professional-area/full-stack-development"
              className="rounded-lg border border-border bg-black bg-opacity-70 backdrop-blur-sm p-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-row h-full">
                <div className="relative w-1/3 h-auto overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src="https://github.com/reatured/public-assets/blob/main/Web%20Design/DOLLAR%20Chat%20Room/Dollar-chat-room.png?raw=true"
                    alt="Full Stack Development"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col ml-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-primary">Full Stack Development</h3>
                  <p className="text-gray-300 mb-2 text-sm flex-grow">
                    Web applications built with modern technologies like Next.js, React, and various backend solutions.
                  </p>
                  <div className="mt-auto flex items-center text-primary text-sm">
                    View Projects <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Technical Artist */}
            <Link
              href="/professional-area/technical-artist"
              className="rounded-lg border border-border bg-black bg-opacity-70 backdrop-blur-sm p-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-row h-full">
                <div className="relative w-1/3 h-auto overflow-hidden rounded-lg flex-shrink-0 bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-gray-400 mb-2">Shader Projects</div>
                    <div className="text-sm text-gray-500">Coming soon</div>
                  </div>
                </div>
                <div className="flex flex-col ml-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-primary">Technical Artist</h3>
                  <p className="text-gray-300 mb-2 text-sm flex-grow">
                    Custom shader development for real-time graphics applications, featuring advanced techniques for
                    visual effects.
                  </p>
                  <div className="mt-auto flex items-center text-primary text-sm">
                    View Projects <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* All Projects Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-bold">All Projects</h2>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProjects.slice(0, 6).map((project) => {
            const hasYouTubeVideo =
              project.youtubeId !== undefined && project.youtubeId !== null && project.youtubeId !== ""

            return (
              <Link
                key={project.id}
                href={`/project/${project.slug}?from=home`}
                className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  {hasYouTubeVideo ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <YouTubeEmbed
                        videoId={project.youtubeId as string}
                        title={project.title}
                        className="absolute top-0 left-0 h-full w-full pt-0"
                        autoplay={true}
                      />
                    </div>
                  ) : (
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform group-hover:scale-105 ${
                        project.imageRatio === "portrait" ? "object-top" : "object-center"
                      }`}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1.5">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  {project.software && (
                    <div className="mt-3 inline-block px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {project.software}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
