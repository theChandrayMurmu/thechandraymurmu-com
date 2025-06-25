import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "DesignStudio",
      description: "A collection of resources, tools, and design system kits to up-skill and shape the future of design. Research, learn, test, and implement design systems.",
      technologies: ["Design Systems", "UI/UX", "Resources", "Guidebooks"],
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
      link: "https://github.com/theChandrayMurmu/DesignStudio"
    },
    {
      id: 2,
      title: "ColorPaletteLibrary",
      description: "A go-to tool for generating and storing color palettes, built as an Android app using Flutter and Material Design.",
      technologies: ["Flutter", "Android", "Material Design"],
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
      link: "https://github.com/theChandrayMurmu/ColorPaletteLibrary"
    },
    {
      id: 3,
      title: "moonspace.xyz",
      description: "Building Team — Building Community. A portfolio and community platform to connect, share, and grow together.",
      technologies: ["Community", "Portfolio", "Newsletter"],
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
      link: "https://github.com/theChandrayMurmu/moonspace.xyz"
    },
    {
      id: 4,
      title: "DesignStudio",
      description: "A collection of resources, tools, and design system kits to up-skill and shape the future of design. Research, learn, test, and implement design systems.",
      technologies: ["Design Systems", "UI/UX", "Resources", "Guidebooks"],
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop",
      link: "https://github.com/theChandrayMurmu/DesignStudio"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in full-stack development and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="text-gray-900 font-medium hover:underline transition-colors"
                >
                  View Project →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
