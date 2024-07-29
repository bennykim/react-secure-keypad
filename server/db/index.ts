export const DB: Record<string, CoordGrid> = {};
export const authDB: Record<string, SvgGrid> = {};

export const createDatabase = ({
  id,
  uid,
  svgGrid,
  coords = [],
  verified = false,
}: { id: string } & CoordGrid) => {
  DB[id] = { uid, svgGrid, coords, verified };
};

export const createAuthDatabase = (uid: string, svgGrid: SvgGrid) => {
  authDB[uid] = svgGrid;
};

export const updateVerificationById = (id: string) => {
  DB[id].verified = true;
};

export const getDatabaseById = (id: string): CoordGrid | undefined => {
  return DB[id];
};

export const getAuthDatabaseById = (uid: string): SvgGrid | undefined => {
  return authDB[uid];
};
