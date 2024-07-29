type RequestBody = { id: string; uid: string; coords: Coord[] };

type SvgGrid = string[][];

type Coord = { x: number; y: number };

type CoordGrid = {
  uid: string;
  svgGrid: SvgGrid;
  coords: Coord[];
  verified: boolean;
};

type Keypad = {
  uid: string;
  keypad: {
    size: { rows: number; columns: number };
    svgGrid: SvgGrid;
  };
};

type PasswordFields = {
  password: string;
};

type GridProps = {
  layout: SvgGrid;
  size: {
    rows: number;
    columns: number;
  };
  render: (
    content: string,
    className: string,
    coord: { x: number; y: number }
  ) => JSX.Element;
};
