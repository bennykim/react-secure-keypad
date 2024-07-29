import { useCallback, useState } from 'react';

import { createKeypad } from '@/api';
import { getUserId } from '@/lib/utils';

export function useKeypad() {
  const [toggle, setToggle] = useState(false);
  const [{ uid, keypad }, setKeypad] = useState<Keypad>({
    uid: '',
    keypad: {
      size: { rows: 0, columns: 0 },
      svgGrid: [],
    },
  });

  const getKeypad = useCallback(async () => {
    const id = getUserId();
    const SVGKeypad = await createKeypad({ id });
    setKeypad(SVGKeypad);
  }, []);

  const onOpen = useCallback(async () => {
    await getKeypad();
    setToggle(true);
  }, []);

  const onClose = useCallback(() => {
    setToggle(false);
  }, []);

  return {
    toggle,
    uid,
    keypad,
    getKeypad,
    onOpen,
    onClose,
  };
}
