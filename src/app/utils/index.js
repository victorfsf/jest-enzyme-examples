/* eslint-disable import/prefer-default-export */

export const validateString = str => str && str.trim().replace(/\n/g, '').length > 0;
