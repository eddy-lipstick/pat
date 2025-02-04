import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { heroContactTranslations } from '@/i18n/translations/heroContact';
import { defaultLanguage } from '@/i18n/config';

const TeamCTA = ({ teamMember }) => {
  // Automatically detect language from URL
  const getCurrentLanguage = () => {
    if (typeof window === 'undefined') return defaultLanguage;
    const pathParts = window.location.pathname.split('/');
    const langFromUrl = pathParts[1]; // Assuming URL structure /{lang}/...
    return heroContactTranslations[langFromUrl] ? langFromUrl : defaultLanguage;
  };

  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [phoneError, setPhoneError] = useState('');

  // Get translations for current language
  const t = heroContactTranslations[getCurrentLanguage()];

  // Rest of the component remains the same, just using t.* for translations
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
    <div className="w-full bg-background text-foreground py-24 px-6 rounded-sm overflow-hidden relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Content Column */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">{t.title}</h2>
          <p className="text-text-secondary text-lg">{t.subtitle}</p>
          <div className="flex flex-col sm:flex-row w-full items-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto group bg-feitlijn-purple hover:bg-feitlijn-purple-600 text-white transition-all duration-300"
              onClick={() => (window.location.href = `/${getCurrentLanguage()}/contact`)}
            >
              <span className="flex items-center justify-center w-full">
                {t.buttons.schedule}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group border-feitlijn-purple text-feitlijn-purple hover:bg-feitlijn-purple hover:text-white transition-all duration-300"
              onClick={() => setShowCallbackForm((prev) => !prev)}
            >
              <span className="flex items-center justify-center w-full">
                {t.buttons.callMe}
                <Phone className="ml-2 w-4 h-4" />
              </span>
            </Button>
          </div>

          {/* Callback Form */}
          {showCallbackForm && (
            <div className="mt-6 p-6 bg-surface-2 rounded-lg">
              {submitStatus.message && (
                <Alert
                  className={`mb-6 ${submitStatus.success ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}
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
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className={`w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${phoneError ? 'border-destructive' : 'border-border'}`}
                    placeholder={t.form.phonePlaceholder}
                    onChange={() => setPhoneError('')}
                  />
                  {phoneError && <p className="mt-2 text-sm text-destructive">{phoneError}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-feitlijn-purple hover:bg-feitlijn-purple-600 text-white transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.form.submitting : t.form.submit}
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Image Column */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-feitlijn-purple/20 to-feitlijn-yellow/20 rounded-full blur-3xl" />
          <Card className="relative bg-surface-2 border-0 overflow-hidden rounded-2xl aspect-square">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <img
              src={teamMember.imageUrl}
              alt={`${teamMember.name} - ${t.team.roles[teamMember.role] || teamMember.role}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-medium text-lg">{teamMember.name}</p>
              <p className="text-text-secondary">
                {t.team.roles[teamMember.role] || teamMember.role}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-24 h-24 bg-feitlijn-purple/10 rounded-full blur-xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-feitlijn-yellow/10 rounded-full blur-xl" />
      </div>
    </div>
  );
};

export default TeamCTA;
