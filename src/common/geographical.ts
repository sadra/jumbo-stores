export const isGeographicalParam = (spot: string): boolean => {
  const regex = /^((\-?|\+?)?\d+(\.\d+)?)$/g;
  return spot.match(regex) !== null;
};
