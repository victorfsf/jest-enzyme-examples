export const CHANGE_NAME = 'CHANGE_NAME';
export const TOGGLE_FORM = 'TOGGLE_FORM';

export const changeName = name => ({
  type: CHANGE_NAME,
  name,
});

export const toggleForm = () => ({
  type: TOGGLE_FORM,
});
