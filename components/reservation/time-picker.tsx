"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export function TimePicker({ selectedTime, onTimeSelect }: TimePickerProps) {
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="p-4">
        {times.map((time) => (
          <Button
            key={time}
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal",
              time === selectedTime && "bg-green-50 text-green-600"
            )}
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}