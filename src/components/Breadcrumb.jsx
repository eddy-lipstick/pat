import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="/" className="text-text-secondary hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
          </a>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight className="h-4 w-4 text-text-secondary" />
            </li>
            <li>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-text-primary font-medium">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
