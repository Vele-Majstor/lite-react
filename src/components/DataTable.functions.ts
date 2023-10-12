export const sortStates = {
  NONE: "NONE",
  DESC: "DESC",
  ASC: "ASC",
};

export function createRows(rows: (unknown | object | any)[]) {
  return rows.map((row) => ({ _id: window.crypto.randomUUID(), ...row }));
}
