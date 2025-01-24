import React from 'react';

const CaseQuote = ({ quote, author, role }) => {
    return (
        <div className="relative my-12 px-6 py-8">
            <div className="absolute -top-4 left-4">
                <svg
                    className="w-8 h-8 text-feitlijn-purple"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            <blockquote className="text-2xl font-roc-grotesk font-medium text-background mb-6">
                {quote}
            </blockquote>

            <footer className="flex items-center gap-2">
                <div>
                    <cite className="text-background font-roc-grotesk font-bold not-italic">
                        {author}
                    </cite>
                    {role && (
                        <p className="text-feitlijn-purple text-sm mt-1">
                            {role}
                        </p>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default CaseQuote;