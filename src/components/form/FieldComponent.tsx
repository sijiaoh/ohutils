import {css} from '@emotion/react';
import {
  ErrorMessage,
  Field,
  FieldConfig,
  GenericFieldHTMLAttributes,
} from 'formik';

export const FieldComponent = ({
  label,
  ...props
}: GenericFieldHTMLAttributes & FieldConfig & {label: string}) => {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <Field {...props} css={css({resize: 'none'})} />
      <ErrorMessage name={props.name} component="div" css={{color: 'red'}} />
    </>
  );
};
