import type {ComponentProps} from 'react';
import Button from 'react-bootstrap/Button';
import {useFormContext} from 'react-hook-form';

export const SubmitButtonComponent = (props: ComponentProps<typeof Button>) => {
  const {
    formState: {isSubmitting, isDirty, isValid},
  } = useFormContext();

  return (
    <Button
      {...props}
      type="submit"
      disabled={isSubmitting || !isDirty || !isValid}
    />
  );
};
