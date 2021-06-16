export const isGeographicalParam = (spot: string): boolean => {
  const regex = /^([-+]?\d[2]+(\.\d{1,8})?)$/g;
  return spot.match(regex) !== null;
};
