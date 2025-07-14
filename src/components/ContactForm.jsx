import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { heroContactTranslations } from '@/i18n/translations/heroContact';
import { languages, defaultLanguage } from '@/i18n/config';

const ContactForm = ({ lang = 'nl' }) => {
  const t = heroContactTranslations?.[lang] || heroContactTranslations?.['nl'];
  if (!t) {
    return null; // Or some fallback UI
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/manqozyn', {
        method: 'POST',
        body: new FormData(e.target),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.',
        });
        e.target.reset();
      } else {
        throw new Error('Er ging iets mis bij het verzenden.');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          'Er ging iets mis bij het verzenden. Probeer het later opnieuw of stuur een e-mail.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {submitStatus.message && (
        <Alert
          className={`mb-6 ${submitStatus.success ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}
        >
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            {t.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t.form.namePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {t.form.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t.form.emailPlaceholder}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            {t.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
            placeholder={t.form.messagePlaceholder}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.form.submitting : t.form.submit}
        </button>
      </form>

      <p className="text-center mt-6 text-text-secondary">
        {t.form.alternative}{' '}
        <a href="mailto:info@patroon.nl" className="text-primary hover:underline">
          info@patroon.nl
        </a>
      </p>
    </div>
  );
};
export default ContactForm;
