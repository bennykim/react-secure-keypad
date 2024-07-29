import { Children } from 'react';

export const Grid = ({ layout, size, render }: GridProps) => (
  <div
    className="flex-1 grid gap-2.5 w-full h-full"
    style={{
      gridTemplateRows: `repeat(${size.rows}, 1fr)`,
      gridTemplateColumns: `repeat(${size.columns}, 1fr)`,
    }}
  >
    {layout.map((row, rowIdx) =>
      Children.toArray(
        row.map((col, colIdx) =>
          render(
            col,
            'bg-gray-200 flex items-center justify-center cursor-pointer',
            { x: rowIdx, y: colIdx }
          )
        )
      )
    )}
  </div>
);
