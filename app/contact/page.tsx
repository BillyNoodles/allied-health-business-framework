'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // TODO: Implement actual form submission
    // For now, just simulate a submission
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="mb-8">
        <p className="text-gray-600">
          Have questions or need assistance? We're here to help! Fill out the form below
          and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === 'submitting'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'submitting'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={status === 'submitting'}
            className="min-h-[150px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>

        {status === 'success' && (
          <p className="text-green-600 text-center">
            Thank you for your message! We'll get back to you soon.
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-center">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              support@example.com
            </a>
          </div>
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM AEST</p>
          </div>
        </div>
      </div>
    </div>
  );
} 