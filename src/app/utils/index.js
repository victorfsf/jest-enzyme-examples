/* eslint-disable import/prefer-default-export */

export const validateString = (str) => {
  const len = str ? str.trim().replace(/\n/g, '').length : 0;
  return len > 0 && len <= 35;
};
