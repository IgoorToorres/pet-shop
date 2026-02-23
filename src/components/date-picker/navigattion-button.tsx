import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type NavigattionButtonProps = {
  navigateDay: (days: number) => void;
  direction: 'left' | 'right';
};

export const NavigattionButton = ({
  navigateDay,
  direction,
}: NavigattionButtonProps) => {
  const isRight = direction === 'right';
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigateDay(isRight ? 1 : -1)}
            variant="outline"
            size={'icon'}
            className="h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            {isRight ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background-tertiary">
          <p>{isRight ? 'Proximo dia' : 'Dia anterior'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
