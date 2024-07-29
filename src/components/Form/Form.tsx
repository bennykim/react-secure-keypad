import { Button } from '@/components/ui/button';
import {
  Form as FormContainer,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  type: Path<T>;
  max: number;
  label: string;
  placeholder: string;
  messages: {
    required: string;
    minLength: string;
  };
  onFocus: VoidFunction;
  onSubmit: () => Promise<void>;
};

export const Form = <T extends FieldValues>({
  form,
  type,
  max,
  label,
  placeholder,
  messages,
  onFocus,
  onSubmit,
}: FormProps<T>) => {
  return (
    <FormContainer {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={type}
          render={({ field }: { field: ControllerRenderProps<T> }) => (
            <FormItem>
              <FormLabel className="text-amber-50">{label}</FormLabel>
              <FormControl>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  {...form.register(type, {
                    required: messages.required,
                    minLength: {
                      value: max,
                      message: messages.minLength,
                    },
                  })}
                  onKeyDown={e => e.preventDefault()}
                  onFocus={onFocus}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.watch(type)?.length !== max}
        >
          전송
        </Button>
      </form>
    </FormContainer>
  );
};
