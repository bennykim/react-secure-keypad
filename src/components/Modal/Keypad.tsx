import { Grid } from '@/components/Grid';
import { Refresh } from '@/components/Icon';
import { Stack } from '@/components/Stack';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import styles from './keypad.module.css';

type KeypadProps = {
  open: boolean;
  size: Keypad['keypad']['size'];
  svgGrid: Keypad['keypad']['svgGrid'];
  progress: number;
  onClose: VoidFunction;
  onRefresh: VoidFunction;
  onRemove: VoidFunction;
  onChange: (props: Coord) => VoidFunction;
};

export const Keypad = ({
  open,
  size,
  svgGrid,
  progress,
  onClose,
  onRefresh,
  onRemove,
  onChange,
}: KeypadProps) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Grid
            layout={svgGrid}
            size={size}
            render={(content, className, coord) => (
              <div
                data-testid={coord.x * 3 + coord.y + 1}
                className={className}
                dangerouslySetInnerHTML={{ __html: content }}
                onClick={onChange(coord)}
              />
            )}
          />
          <Stack>
            <Button
              data-testid="refresh"
              variant="ghost"
              className={styles.button}
              onClick={onRefresh}
            >
              <Refresh />
            </Button>
            <Button
              variant="destructive"
              className={styles.button}
              onClick={onRemove}
            >
              삭제
            </Button>
            <Button
              variant="default"
              className={styles.button}
              onClick={onClose}
            >
              확인
            </Button>
          </Stack>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};
