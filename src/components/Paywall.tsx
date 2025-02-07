import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Paywall = ({ price, courseTitle }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/mrbellnl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          course: courseTitle, // Added explicit field name
          price,
          _subject: `Nieuwe cursus aanvraag: ${courseTitle || 'Onbekende cursus'}`,
          source: window.location.href, // Added source URL for reference
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Reset form
        setEmail('');
        setName('');
        setCompany('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert className="border-primary/50 bg-primary/10">
            <AlertDescription>
              <h3 className="font-semibold mb-2">Bedankt voor je aanvraag!</h3>
              <p>
                We nemen zo snel mogelijk contact met je op om je toegang te geven tot de volledige
                cursus.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-primary" />
          <CardTitle>Premium Inhoud</CardTitle>
        </div>
        <CardDescription>Krijg toegang tot alle lessen in deze cursus voor {price}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jouw naam"
              disabled={status === 'submitting'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jouw@email.nl"
              disabled={status === 'submitting'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Bedrijf</Label>
            <Input
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Jouw bedrijfsnaam"
              disabled={status === 'submitting'}
            />
          </div>
          {status === 'error' && (
            <Alert variant="destructive">
              <AlertDescription>
                Er is iets misgegaan. Probeer het later opnieuw of neem contact met ons op.
              </AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Bezig met versturen...' : 'Aanvragen'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Paywall;
