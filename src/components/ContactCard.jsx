import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ContactCard = ({ lang, translations }) => {
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [phoneError, setPhoneError] = useState('');

  const t = translations[lang];

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!/^(\+)?[\d]{8,}$/.test(cleanPhone)) {
      return t.form.validation.phoneError;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumber = e.target.phone.value;
    const phoneValidationError = validatePhoneNumber(phoneNumber);

    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setPhoneError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mpwqdejj', {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: t.form.success,
        });
        e.target.reset();
        setTimeout(() => {
          setShowCallbackForm(false);
          setSubmitStatus({ success: false, message: '' });
        }, 3000);
      } else {
        throw new Error(t.form.errorMessage);
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: t.form.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-surface-1">
      <CardHeader>
        <CardTitle>{t.interest}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{t.contactText}</p>

          <div className="flex flex-col sm:flex-col gap-3">
            <Button variant="default" asChild>
              <a href={`/${lang}/contact`}>
                <span className="flex items-center justify-center">
                  {t.contactButton}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto group border-feitlijn-purple text-feitlijn-purple hover:bg-feitlijn-purple hover:text-white"
              onClick={() => setShowCallbackForm((prev) => !prev)}
            >
              <span className="flex items-center justify-center">
                {t.buttons.callMe}
                <Phone className="ml-2 w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>

        {showCallbackForm && (
          <div className="mt-4 p-4 bg-surface-2 rounded-lg">
            {submitStatus.message && (
              <Alert
                className={`mb-4 ${
                  submitStatus.success
                    ? 'bg-success/10 text-success'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                <AlertDescription>{submitStatus.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="hidden"
                name="_page_url"
                value={typeof window !== 'undefined' ? window.location.href : ''}
              />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t.form.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  {t.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className={`w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent ${
                    phoneError ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder={t.form.phonePlaceholder}
                  onChange={() => setPhoneError('')}
                />
                {phoneError && <p className="mt-1 text-sm text-destructive">{phoneError}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-feitlijn-purple hover:bg-feitlijn-purple-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;
