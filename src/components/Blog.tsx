import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Exploring the latest trends in web development including AI integration, web assembly, and the evolution of JavaScript frameworks.",
      date: "2024-01-15",
      readTime: "5 min read",
      topics: ["Web Development", "Technology", "JavaScript"],
      author: "Your Name"
    },
    {
      id: 2,
      title: "Building Scalable React Applications: Best Practices",
      excerpt: "A comprehensive guide to structuring React applications for scalability, maintainability, and optimal performance.",
      date: "2024-01-10",
      readTime: "8 min read",
      topics: ["React", "Frontend", "Best Practices"],
      author: "Your Name"
    },
    {
      id: 3,
      title: "The Art of Minimalist Design in Digital Products",
      excerpt: "How to create clean, functional, and beautiful user interfaces that prioritize user experience over visual complexity.",
      date: "2024-01-05",
      readTime: "6 min read",
      topics: ["Design", "UI/UX", "Minimalism"],
      author: "Your Name"
    },
    {
      id: 4,
      title: "Database Optimization Techniques for Modern Applications",
      excerpt: "Performance optimization strategies for databases including indexing, query optimization, and caching mechanisms.",
      date: "2023-12-28",
      readTime: "10 min read",
      topics: ["Database", "Performance", "Backend"],
      author: "Your Name"
    },
    {
      id: 5,
      title: "Introduction to TypeScript: Why Type Safety Matters",
      excerpt: "Understanding the benefits of TypeScript and how it can improve your JavaScript development workflow and code quality.",
      date: "2023-12-20",
      readTime: "7 min read",
      topics: ["TypeScript", "JavaScript", "Programming"],
      author: "Your Name"
    },
    {
      id: 6,
      title: "Responsive Design Patterns for Modern Web Applications",
      excerpt: "Essential responsive design patterns and techniques for creating websites that work seamlessly across all devices.",
      date: "2023-12-15",
      readTime: "9 min read",
      topics: ["CSS", "Responsive Design", "Frontend"],
      author: "Your Name"
    }
  ];

  const allTopics = [...new Set(blogPosts.flatMap(post => post.topics))];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTopic = !selectedTopic || post.topics.includes(selectedTopic);
      
      return matchesSearch && matchesTopic;
    });
  }, [searchTerm, selectedTopic, blogPosts]);

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Blog & Articles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic('')}
              className={`px-4 py-2 rounded-full transition-colors ${
                !selectedTopic 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedTopic === topic 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: any) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.topics.map((topic: string) => (
                      <Badge key={topic} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="mt-4">
                  <a href="#" className="text-gray-900 font-medium hover:underline transition-colors">
                    Read More →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
