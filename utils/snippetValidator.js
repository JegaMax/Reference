import { isEmpty } from 'lodash';
import { snippetBodyRegex, snippetHeadRegex } from '../config/constants';

export default function (snippet) {
  const errors = {};

  const getGenericError = () => `Please enter a valid HTML code`;

  const methods = {
    validate: () => {
      if (isEmpty(snippet.name)) {
        methods.setErrors('name', 'Name cannot be empty');
      }

      if (isEmpty(snippet.headCode) || !snippetHeadRegex.test(snippet.headCode)) {
        methods.setErrors('headCode', getGenericError());
      }

      if (isEmpty(snippet.bodyCode) || !snippetBodyRegex.test(snippet.bodyCode)) {
        methods.setErrors('bodyCode', getGenericError());
      }
    },
    setErrors: (key, value) => {
      errors[key] = value;
    },
    getErrors: () => {
      return errors;
    },
    isValid: () => {
      return Object.keys(methods.getErrors()).length === 0;
    },
  };

  return methods;
}
