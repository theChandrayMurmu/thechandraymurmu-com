
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [100, 300, 500, 1000, 2000];

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Razorpay integration
      // In a real application, you would initialize Razorpay here
      const paymentAmount = customAmount ? parseInt(customAmount) : selectedAmount;
      
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: `Thank you for your support of ₹${paymentAmount}. Your contribution means a lot!`,
      });

      // Reset form
      setCustomAmount('');
      setMessage('');
      setSelectedAmount(500);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="support" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Support My Work</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you find value in my projects or articles, consider supporting my work. 
            Your contribution helps me continue creating and sharing knowledge with the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Support Options */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-light text-gray-900">Choose Support Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Predefined Amounts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Amount (₹)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAmount === amount && !customAmount
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Enter Custom Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount in ₹"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>

              {/* Support Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave a Message (Optional)
                </label>
                <Textarea
                  placeholder="Your message of support..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                  rows={3}
                />
              </div>

              <Button
                onClick={handlePayment}
                disabled={isLoading || (!selectedAmount && !customAmount)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg"
              >
                {isLoading ? 'Processing...' : `Support with ₹${customAmount || selectedAmount}`}
              </Button>
            </CardContent>
          </Card>

          {/* Why Support */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-light text-gray-900">Why Your Support Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Open Source Projects</h4>
                  <p className="text-gray-600 text-sm">Supporting the development and maintenance of open source tools and libraries.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Educational Content</h4>
                  <p className="text-gray-600 text-sm">Creating tutorials, articles, and resources to help other developers grow.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Community Building</h4>
                  <p className="text-gray-600 text-sm">Fostering a supportive community of developers and designers.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Innovation</h4>
                  <p className="text-gray-600 text-sm">Experimenting with new technologies and sharing insights with the community.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Every contribution, no matter the size, helps me dedicate more time to creating valuable content and tools for the developer community."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Secure payments powered by Razorpay • Your support is greatly appreciated
          </p>
        </div>
      </div>
    </section>
  );
};

export default Support;
