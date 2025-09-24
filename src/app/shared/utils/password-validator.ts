import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    const errors: ValidationErrors = [];

    if (!/(?=.*[A-Z])/.test(password)) {
      errors['uppercase'] = 'At least one uppercase letter.';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors['lowercase'] = 'At least one lowercase letter.';
    }
    if (!/(?=.*[0-9])/.test(password)) {
      errors['digit'] = 'At least one digit.';
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors['specialChar'] = 'At least one special character (!@#$%^&*).';
    }
    if (password.length < 8) {
      errors['min_length'] = 'At least 8 characters long.';
    }

    return Object.keys(errors).length ? errors : null;
  };
}
