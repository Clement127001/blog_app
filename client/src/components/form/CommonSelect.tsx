import { Fragment } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { CommonInputProps } from "@/types/form";

export function CommonSelect<T extends FieldValues>({
  label,
  name,
  hForm,
  placeholder,
  registerOptions,
  wrapperClassName = "",
  options,
}: CommonInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = hForm;

  return (
    <div className={`space-y-2 ${wrapperClassName}`}>
      {label && (
        <Label
          htmlFor={name}
          className="text-app-black-300 dark:text-app-primary-300 capitalize text-[16px]"
        >
          {label}
          {registerOptions?.required ? (
            <span className="text-app-accent-error-500 ml-1">*</span>
          ) : (
            ""
          )}
        </Label>
      )}

      <div className="relative">
        <Controller
          control={control}
          name={name}
          rules={registerOptions}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="capitalize">{label}</SelectLabel>
                  {options &&
                    options.map((option) => (
                      <Fragment key={option.value}>
                        <SelectItem value={option.value}>
                          {option.label}
                        </SelectItem>
                      </Fragment>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-app-accent-error-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
