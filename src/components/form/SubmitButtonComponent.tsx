import type {ComponentProps} from 'react';
import Button from 'react-bootstrap/Button';
import {useFormContext} from 'react-hook-form';
import {LoadingComponent} from '../LoadingComponent';

export const SubmitButtonComponent = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => {
  const {
    formState: {isSubmitting, isDirty, isValid},
  } = useFormContext();

  return (
    <Button
      {...props}
      type="submit"
      disabled={isSubmitting || !isDirty || !isValid}
    >
      {isSubmitting ? (
        <LoadingComponent width="1.5em" height="1.5em" />
      ) : (
        children
      )}
    </Button>
  );
};
