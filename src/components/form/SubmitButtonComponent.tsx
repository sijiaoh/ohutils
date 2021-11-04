import {useFormikContext} from 'formik';
import {ComponentProps} from 'react';
import Button from 'react-bootstrap/Button';

export const SubmitButtonComponent = (props: ComponentProps<typeof Button>) => {
  const {isSubmitting, dirty, errors} = useFormikContext();

  return (
    <Button
      {...props}
      type="submit"
      disabled={isSubmitting || !dirty || !!Object.keys(errors).length}
      variant="primary"
    />
  );
};
