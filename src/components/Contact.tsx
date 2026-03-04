import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent",
            description: "Thanks for reaching out! I'll get back to you within 24–48 hours.",
        });

        setName('');
        setEmail('');
        setIdea('');
        setIsLoading(false);
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-light text-gray-900 mb-4 font-serif">Have a project in mind? Let's talk.</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        It doesn't have to be fully figured out yet. Tell me what you're working on — even just the rough idea — and we'll figure out the rest together. No obligation, no hard sell.
                    </p>
                </div>

                <Card className="border-0 shadow-lg max-w-xl mx-auto">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <Input
                                    required
                                    type="text"
                                    placeholder="e.g. Priya Sharma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Idea</label>
                                <Textarea
                                    required
                                    placeholder="Tell me what you're building..."
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                    className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                                    rows={4}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                            >
                                {isLoading ? 'Sending...' : 'Send me a message →'}
                            </Button>
                            <p className="text-center text-sm text-gray-500 mt-4">
                                I reply within 24–48 hours
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Contact;
