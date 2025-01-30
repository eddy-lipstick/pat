import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const LogoTooltip = ({ children, content }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-pointer">{children}</div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          className="max-w-sm bg-surface-2 p-4 text-sm text-text-2 border border-surface-3 rounded-lg z-50"
          sideOffset={5}
        >
          <p className="leading-relaxed">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogoTooltip;
