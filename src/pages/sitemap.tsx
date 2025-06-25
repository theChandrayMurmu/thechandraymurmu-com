import DevStrip from '@/components/ui/DevStrip';

const Sitemap = () => (
  <>
    <DevStrip />
    <main className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <ul className="space-y-4 text-lg">
        <li><a href="#hero" className="text-blue-600 hover:underline">Home</a></li>
        <li><a href="#projects" className="text-blue-600 hover:underline">Projects</a></li>
        <li><a href="#blog" className="text-blue-600 hover:underline">Blog</a></li>
        <li><a href="#support" className="text-blue-600 hover:underline">Support</a></li>
        <li><a href="/resume.pdf" className="text-blue-600 hover:underline">Resume</a></li>
      </ul>
    </main>
  </>
);

export default Sitemap; 