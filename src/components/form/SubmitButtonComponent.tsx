import {useFormikContext} from 'formik';

export const SubmitButtonComponent = (
  props: JSX.IntrinsicElements['button']
) => {
  const {isSubmitting, dirty, errors} = useFormikContext();

  return (
    <button
      {...props}
      disabled={isSubmitting || !dirty || !!Object.keys(errors).length}
      css={{
        color: 'black',
        border: 'solid 2px gray',
        borderRadius: '1em',
        marginTop: '1em',
        transition: '.2s',
        ':hover': {
          color: 'white',
          backgroundColor: 'gray',
        },
        ':disabled': {
          color: 'gray',
          backgroundColor: 'lightgray',
          border: 'solid 2px lightgray',
        },
      }}
    />
  );
};
