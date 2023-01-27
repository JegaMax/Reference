import { v4, validate } from 'uuid';
const generateId = () => v4();
export default generateId;

export const convertId = (input) => {
  if (validate(input?._id)) {
    return;
  }
  input._id = validate(input?.id) ? input.id : v4();
};
