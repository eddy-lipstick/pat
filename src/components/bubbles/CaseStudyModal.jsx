import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CaseStudyModal = ({ isOpen, onClose, study }) => {
  if (!study) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-primary-900 border-primary-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-100">
            {study.title}
          </DialogTitle>
          <DialogDescription className="text-lg text-primary-200">
            {study.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Main image */}
          {study.image && (
            <div className="w-full aspect-video bg-primary-800 rounded-lg overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="text-primary-200 space-y-4">
            <p className="text-lg leading-relaxed">
              {study.content}
            </p>

            {study.bulletPoints && (
              <ul className="list-disc list-inside space-y-2">
                {study.bulletPoints.map((point, index) => (
                  <li key={index} className="text-primary-300">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Call to action */}
          {study.link && (
            <div className="flex justify-end">
              <a
                href={study.link}
                className="inline-flex items-center justify-center px-6 py-3 
                         bg-feitlijn-yellow text-primary-900 rounded-lg font-medium
                         hover:bg-feitlijn-yellow-400 transition-colors"
              >
                View Case Study
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};