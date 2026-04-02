'use client';

import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  MapPin,
} from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: 'text-blue-600',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, '')}`,
      color: 'text-green-600',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      value: profile.location,
      href: '#',
      color: 'text-purple-600',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: 'LinkedIn',
      value: 'shad-ali-099a82145',
      href: profile.linkedin,
      color: 'text-blue-700',
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: 'GitHub',
      value: 'alishad846',
      href: profile.github,
      color: 'text-gray-800',
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: 'Instagram',
      value: '___1stranger___',
      href: profile.instagram,
      color: 'text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground">
          I&apos;m open to internships, software engineering roles, AI/ML
          opportunities, and collaborations on data or LLM-powered products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {contactInfo.map((contact, index) => (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-gray-100 p-2 ${contact.color}`}>
                  {contact.icon}
                </div>
                <CardTitle className="text-lg">{contact.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3 text-base font-medium">
                {contact.value}
              </CardDescription>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(contact.href, '_blank')}
              >
                {contact.title === 'Location'
                  ? 'View Location'
                  : `Open ${contact.title}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4 pt-6 text-center">
        <div className="bg-accent rounded-lg p-6">
          <h3 className="mb-2 font-semibold">What I&apos;m Looking For</h3>
          <p className="text-muted-foreground text-sm">
            Software engineering internships, AI/ML roles, backend development,
            LLM product work, analytics-focused projects, and strong learning
            environments.
          </p>
        </div>

        <p className="text-muted-foreground text-sm">
          Feel free to reach out for collaborations, hiring conversations, or
          product ideas where AI and software engineering can create real value.
        </p>
      </div>
    </div>
  );
}
