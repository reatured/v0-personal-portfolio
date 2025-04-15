import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-8">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5df7337598a1771a4a73ef26/1576561306691-1NGKKJYVFK23LSYMH2PN/IMG_0777.jpeg?format=750w"
                alt="Lingyi Zhou"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground">lingyi@newschool.edu</p>
                <p className="text-muted-foreground">646-220-9597</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Based in</h3>
                <p className="text-muted-foreground">New York, NY</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Specialization</h3>
                <p className="text-muted-foreground">Software Engineering, XR Development, 3D Design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I am an experienced software engineer specializing in Unity3D and C# with a strong background in
                developing real-time 3D graphics, cross-platform applications, and XR (AR/VR) experiences. My work
                focuses on creating immersive digital experiences and optimizing Unity integrations.
              </p>
              <p>
                With expertise in both software development and design, I bring a unique perspective to my projects,
                combining technical proficiency with creative vision. I'm passionate about advancing XR technologies and
                creating immersive experiences for cutting-edge platforms like Meta Quest, Apple Vision Pro, and
                HoloLens.
              </p>
              <p>
                Throughout my career, I've worked with companies like REALLY AR and Snap Inc., developing AR experiences
                for major film franchises and creating tools that enable sophisticated AR interactions. I enjoy pushing
                the boundaries of what's possible in interactive media and virtual experiences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">MFA in Design and Technology</h3>
                <p className="text-muted-foreground">Parsons School of Design | 2021-2023</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">MA in Design and Development of Digital Games</h3>
                <p className="text-muted-foreground">Columbia University | 2019-2021</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">BS in Agricultural and Environmental Education</h3>
                <p className="text-muted-foreground">University of California, Davis | 2015-2019</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Professional Certificate in AR-VR Development and 3D Graphics</h3>
                <p className="text-muted-foreground">New York University | Nov 2021</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Programming</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>C#, Unity3D</li>
                  <li>React, JavaScript</li>
                  <li>Go, Python</li>
                  <li>GLSL, HLSL</li>
                  <li>C++, Java</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Design & 3D</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Blender, Cinema4D</li>
                  <li>Maya, ZBrush</li>
                  <li>Substance Painter</li>
                  <li>Figma, Adobe Suite</li>
                  <li>Lens Studio</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Experience Highlights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold">REALLY AR (2023-2024):</span> Developed a centralized user profile
                system for an AR game platform, resulting in 20,000+ user engagements. Created Unity editor extension
                tools and engineered AR experiences for major film franchises.
              </p>
              <p>
                <span className="font-semibold">Snap Inc. (2022):</span> Developed a Procedural Mesh manipulation system
                for Lens Studio, integrating hand gesture tracking and enabling sophisticated AR interactions without
                extensive coding.
              </p>
              <p>
                <span className="font-semibold">Columbia University (2019-2021):</span> Conducted game research on the
                psychological impact of video games on young students in STEM topics, especially climate topics. Led
                game development workshops and mentorship programs.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
