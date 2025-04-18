"use client"
import { FileDown } from "lucide-react"
import { trackEvent, EventCategory } from "@/lib/analytics"

export default function ResumePage() {
  const handlePrintResume = () => {
    // Track the resume print/download action
    trackEvent(EventCategory.RESUME, "download")
    window.print()
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resume</h1>
        <button
          onClick={handlePrintResume}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <FileDown size={16} />
          <span>Print Resume</span>
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 space-y-8 print:border-none print:p-0 print:shadow-none">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Lingyi Zhou</h2>
          <p className="text-muted-foreground mt-2">Software Engineer</p>

          {/* Updated contact info with responsive layout */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-4 mt-4 text-sm text-muted-foreground space-y-2 md:space-y-0">
            <span>lingyi@newschool.edu</span>
            <span className="hidden md:inline">•</span>
            <span>646-220-9597</span>
            <span className="hidden md:inline">•</span>
            <span>https://lingyizhou.com</span>
          </div>
        </div>

        {/* Summary */}
        <section>
          <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Professional Summary</h3>
          <p className="text-muted-foreground">
            Experienced software engineer specializing in Unity3D and C# with a strong background in developing
            real-time 3D graphics, cross-platform applications, and XR (AR/VR) experiences. Skilled in optimizing Unity
            integrations, live data streaming, and building robust systems for motion capture visualization. Passionate
            about advancing XR technologies and creating immersive experiences for cutting-edge platforms like Meta
            Quest, Apple Vision Pro, and HoloLens.
          </p>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Education</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">MFA in Design and Technology</h4>
                <span className="text-muted-foreground">2021-2023</span>
              </div>
              <p className="text-muted-foreground">Parsons School of Design, New York, NY</p>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">MA in Design and Development of Digital Games</h4>
                <span className="text-muted-foreground">2019-2021</span>
              </div>
              <p className="text-muted-foreground">Columbia University, New York, NY</p>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">BS in Agricultural and Environmental Education</h4>
                <span className="text-muted-foreground">2015-2019</span>
              </div>
              <p className="text-muted-foreground">University of California, Davis, Davis, CA</p>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Professional Certificate in AR-VR Development and 3D Graphics</h4>
                <span className="text-muted-foreground">Nov 2021</span>
              </div>
              <p className="text-muted-foreground">New York University</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Professional Experience</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Software Engineer @ REALLY AR</h4>
                <span className="text-muted-foreground">Aug 2023 - Aug 2024</span>
              </div>
              <p className="text-muted-foreground">
                An AR marketing company for new movies, formerly known as Moviebill, Burbank, CA
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Backend development of a centralized user profile system that combines separate progression and
                  achievement systems across multiple games on our AR game platform, resulting in 20,000+ user
                  engagements in first two months. Conducted user research and made a quick prototype in Figma to
                  demonstrate the workflow of the new system.
                </li>
                <li>
                  Developed Unity editor extension tools to support colleagues of different roles in the team, such as
                  tools that enable level designers to focus their attention on rapidly prototyping and deploying new
                  content with standard configurations and assets, and tools that connect backend designers to the
                  online user database to the game platform in Unity.
                </li>
                <li>
                  Engineered AR experiences for major film franchises, such as The Marvels, using Lens Studio and Effect
                  House.
                </li>
                <li>Engineered cross-platform virtual reality experiences for Meta Quest 3 and Apple Vision Pro.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Software Engineer @ Snap Inc.</h4>
                <span className="text-muted-foreground">May 2022 - Aug 2022</span>
              </div>
              <p className="text-muted-foreground">The company of Snapchat, Spectacles and Camera Kit, Mountain, CA</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Developed a Procedural Mesh manipulation system for Lens Studio, integrating hand gesture tracking and
                  enabling sophisticated AR interactions without extensive coding.
                </li>
                <li>
                  Created comprehensive documentation, tutorials, and video demonstrations for procedural mesh
                  functionality, published as official Lens Studio templates and reference materials.
                </li>
                <li>
                  Engineered an optimized AR drawing asset with customizable brush-erase systems, supporting real-time
                  content creation and manipulation in augmented reality experiences.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Graduate Research Assistant @ Columbia University</h4>
                <span className="text-muted-foreground">Sept 2019 - May 2021</span>
              </div>
              <p className="text-muted-foreground">
                Mentor: Joey Lee at The Games Research Lab at Teachers College, Columbia University, New York, NY
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Participated in game research on the psychological impact of video games on young students in various
                  STEM topics, especially the climate topics.
                </li>
                <li>
                  Led game development workshops and mentorship programs, combining research-driven design approaches
                  with technical instruction in industry tools, guiding students from initial concepts through final
                  implementation.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Projects</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Planner Webapp (React App)</h4>
                <span className="text-muted-foreground">March 2025</span>
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Developed a task management web application with React that enables users to organize and track daily
                  activities
                </li>
                <li>
                  Implemented React Router for consistent navigation across multiple pages while maintaining header and
                  footer
                </li>
                <li>Created a local JSON database system for persistent data storage with real-time updates</li>
                <li>Designed responsive UI components following modern web development practices</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Roblox Fashion Collaboration</h4>
                <span className="text-muted-foreground">Jan 2023 - May 2023</span>
              </div>
              <p className="text-sm text-muted-foreground">
                An official online fashion show event as a collaboration between Parsons Fashion Design and Roblox
                official
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Resolved key pipeline issues to successfully convert 20+ apparel designs into in-game assets.</li>
                <li>
                  Modeled, rigged, and optimized 20+ clothing assets to ensure compatibility with player character
                  movements across various game scenarios.
                </li>
                <li>
                  Showcased newly designed apparel in a physical exhibition, bridging digital and physical fashion
                  experiences.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Founder @ Ugly Face Generator Apparel</h4>
                <span className="text-muted-foreground">Aug 2024 - Dec 2024</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A fashion brand featuring distinctive generative design, New York, NY
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Pioneered an innovative gamified design platform that transforms customers into co-creators, enabling
                  personalized participation in generating unique apparel prints.
                </li>
                <li>
                  Developed comprehensive e-commerce pipeline and non-AI generated program. The generation program is
                  integrated on the online website, which enables collaboration between customers and the designer for
                  the end print design.
                </li>
                <li>Coordinated end-to-end supply chain operations from manufacturing through final delivery.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Game Designer and Developer @ Just Another Day</h4>
                <span className="text-muted-foreground">Sept 2022 - May 2023</span>
              </div>
              <p className="text-sm text-muted-foreground">
                An Indie Game Created with Unity3D for as my solo thesis project, New York, NY
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  Created "Just Another Day," an indie game using Unity3D, featuring five core gameplay systems:
                  physics-based puzzles, dynamic stitching, interactive color painting, real-time cooking, and
                  first-person interaction. Engineered seamless level transitions and crafted a compelling narrative.
                  Managed the entire development lifecycle independently.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Skills</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Programming Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">C#</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Go</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">GLSL</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">HLSL</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">C++</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  React Native
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">React</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Javascript
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">HTML</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">CSS</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Java</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Python</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Design Software</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Figma</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Adobe Photoshop
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Indesign</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Illustrator
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Premiere</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  After Effects
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Adobe XD</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Game and Interaction Development</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Unity 3D</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Unreal Engine
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Lens Studio
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Firebase</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Data Structure and Algorithms
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Distributed System
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3D Design and Modeling</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Blender</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Cinema4D</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Fusion360</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Maya</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">ZBrush</span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Substance Painter
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">VR Headset Development</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Oculus Quest
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                  Apple Vision Pro
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
            color: black;
          }
          
          .container {
            max-width: 100%;
            padding: 0;
            margin: 0;
          }
          
          button, nav, header, footer, .sidebar {
            display: none !important;
          }
          
          .text-muted-foreground {
            color: #333 !important;
          }
          
          .bg-secondary {
            background-color: #f0f0f0 !important;
            color: #333 !important;
          }
          
          h1, h2, h3, h4 {
            color: black !important;
          }
          
          .border-border {
            border-color: #ddd !important;
          }
        }
      `}</style>
    </div>
  )
}
