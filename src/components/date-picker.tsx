// date-picker.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';

interface CalendarDatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function CalendarDatePicker({
  className,
  value,
  onChange,
  disabled,
  ...props
}: CalendarDatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <div className={cn('grid-gap-2', className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            disabled={disabled} // Use the disabled prop here
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, 'LLL dd, y')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={date}
            numberOfMonths={1}
            disabled={disabled} // Use the disabled prop here if Calendar supports it
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}