import { CapitalizeFirstLetter } from '@app/shared/utils/capitalize-first-letter';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;

export const FormatErrorMessage = (error: FirebaseError): string => {
  const code = error.code.split('/')[0];
  const reason = error.code.split('/')[1].split('-').join(' ');
  const errorMessage = CapitalizeFirstLetter(reason);

  return `The ${code} error occurred. ${errorMessage}.`;
};
