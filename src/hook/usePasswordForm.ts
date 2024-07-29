import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MAX_PASSWORD_LENGTH, PASSWORD } from '@/constants';
import { calculateLinearValue } from '@/lib/utils';

export function usePasswordForm() {
  const [coords, setCoords] = useState<Coord[]>([]);

  const form = useForm<PasswordFields>({
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
    shouldUnregister: true,
    shouldFocusError: false,
  });

  const passwordLength = useMemo(
    () => form.getValues(PASSWORD).length,
    [form.getValues(PASSWORD).length]
  );

  const progress = useMemo(
    () => calculateLinearValue(MAX_PASSWORD_LENGTH, passwordLength),
    [passwordLength]
  );

  const clearForm = useCallback(() => {
    form.reset();
    setCoords([]);
  }, [form]);

  return {
    form,
    progress,
    coords,
    setCoords,
    clearForm,
  };
}
