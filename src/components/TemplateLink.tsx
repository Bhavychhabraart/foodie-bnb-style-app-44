
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TemplateLink = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/template">
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-20 right-4 z-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md rounded-full"
            >
              <FileText className="h-5 w-5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Setup Template</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TemplateLink;
