import React from 'react';
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-1 text-text-primary w-full py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a
              href="/"
              class="text-2xl font-bold text-text-1 hover:text-feitlijn-purple-400 transition-colors flex items-center gap-2 font-roc-grotesk"
              aria-label="Home"
            >
              <img src="/logo.svg" alt="" class="h-6 w-auto" />
            </a>
            <p className="text-sm text-text-secondary">
              Making legal design accessible and engaging through innovative solutions.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-roc-grotesk font-semibold text-feitlijn-purple">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/services/legal-design">Legal Design</a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/services/consulting">Consulting</a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/services/workshops">Workshops</a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/services/documentation">Documentation</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-roc-grotesk font-semibold text-feitlijn-purple">Resources</h3>
            <ul className="space-y-2">
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/blog">Blog</a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/case-studies">Case Studies</a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/resources">Downloads</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-roc-grotesk font-semibold text-feitlijn-purple">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <a href="mailto:info@patroon.nl" className="hover:text-feitlijn-purple transition-colors">
                  info@patroon.nl
                </a>
              </li>
              <li className="text-sm hover:text-feitlijn-purple transition-colors">
                <a href="/contact">Contact Form</a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-surface-2" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-tertiary">
          <div className="mb-4 md:mb-0">
            © {currentYear} Patroon Legal Design B.V.
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-feitlijn-purple transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-feitlijn-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;