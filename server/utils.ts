import { every } from 'lodash-es';

export const areAllCoordsSame = (coords: Coord[]) => {
  return every(
    coords,
    coord => coord.x === coords[0].x && coord.y === coords[0].y
  );
};
