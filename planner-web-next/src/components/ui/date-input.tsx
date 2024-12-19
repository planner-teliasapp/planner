"use client"

import * as React from "react"

import { Input } from "./input"
import { format, isValid, Locale, parse } from "date-fns"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { FormControl } from "./form"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"

export interface InputProps {
  selected?: Date
  onDateSelect?: (date: Date | undefined) => void
  locale?: Locale
}

const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ locale, onDateSelect, selected }, ref) => {
    // Hold the month in state to control the calendar when the input changes
    const [month, setMonth] = useState(new Date())

    // Hold the selected date in state
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(selected)

    // Hold the input value in state
    const [inputValue, setInputValue] = useState(selected ? format(selected, "dd/MM/yyyy") : "")

    const handleDayPickerSelect = (date: Date | undefined) => {
      if (!date) {
        setInputValue("")
        setSelectedDate(undefined)
        onDateSelect?.(undefined)
      } else {
        setSelectedDate(date)
        onDateSelect?.(date)
        setMonth(date)
        setInputValue(format(date, "dd/MM/yyyy"))
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value.replace(/\D/g, "")

      if (input.length >= 5) {
        input = input.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3")
      } else if (input.length >= 3) {
        input = input.replace(/^(\d{2})(\d{0,2}).*/, "$1/$2")
      }

      setInputValue(input) // keep the input value in sync

      const parsedDate = parse(input, "dd/MM/yyyy", new Date())

      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate)
        onDateSelect?.(parsedDate)
        setMonth(parsedDate)
      } else {
        setSelectedDate(undefined)
        onDateSelect?.(undefined)
      }
    }

    return (
      <div className="flex flex-row items-center gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="dd/mm/yyyy"
          ref={ref}
        />
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
              month={month}
              onMonthChange={setMonth}
              locale={locale}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

DateInput.displayName = "DateInput"

export { DateInput }