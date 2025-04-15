import Image from "next/image"
import Link from "next/link"
import { getLatestProjects } from "@/lib/db"
import { getAllProjects } from "@/lib/db" // We'll add this function

export default async function Home() {
  const latestProjects = await getLatestProjects(3)
  const allProjects = await getAllProjects() // Fetch all projects

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">About Me</div>
          <p className="text-gray-300">
            I am an experienced software engineer specializing in Unity3D and C# with a strong background in developing
            real-time 3D graphics, cross-platform applications, and XR (AR/VR) experiences. I'm passionate about
            advancing XR technologies and creating immersive experiences for cutting-edge platforms like Meta Quest,
            Apple Vision Pro, and HoloLens.
          </p>

          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/1576561306691-1NGKKJYVFK23LSYMH2PN/IMG_0777.jpeg?format=750w"
              alt="3D Artwork"
              width={750}
              height={750}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4"></div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Education</div>
          <ul className="list-disc space-y-2 pl-5">
            <li className="text-gray-300">MFA in Design and Technology at Parsons School of Design (2021-2023)</li>
            <li className="text-gray-300">
              MA in Design and Development of Digital Games at Columbia University (2019-2021)
            </li>
            <li className="text-gray-300">
              BS in Agricultural and Environmental Education at University of California, Davis (2015-2019)
            </li>
            <li className="text-gray-300">
              Professional Certificate in AR-VR Development and 3D Graphics at New York University (Nov 2021)
            </li>
          </ul>
        </div>
        <div className="space-y-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">Latest Projects</div>
          <div className="space-y-4">
            {latestProjects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.slug}`}
                className="block rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-gray-300 line-clamp-2">{project.content.split("\n")[0].replace("# ", "")}</p>
                    {project.software && (
                      <div className="mt-2 inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {project.software}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-2">Featured Project: Planner Webapp</h3>
              <p className="text-gray-300 mb-4">
                A task management web application built with React that enables users to organize and track daily
                activities. Features include React Router for navigation, local JSON database for persistent storage,
                and responsive UI components following modern web development practices.
              </p>
              <div className="text-sm text-gray-400">Completed March 2025</div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-2">Featured Project: Roblox Fashion Collaboration</h3>
              <p className="text-gray-300 mb-4">
                An official online fashion show event as a collaboration between Parsons Fashion Design and Roblox.
                Resolved key pipeline issues to convert 20+ apparel designs into in-game assets and showcased designs in
                a physical exhibition, bridging digital and physical fashion experiences.
              </p>
              <div className="text-sm text-gray-400">Jan 2023 - May 2023</div>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              className="block bg-card rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform group-hover:scale-105 ${
                    project.imageRatio === "portrait" ? "object-top" : "object-center"
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{project.content.split("\n")[0].replace("# ", "")}</p>
                {project.software && (
                  <div className="mt-4 inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    {project.software}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
