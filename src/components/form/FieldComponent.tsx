import {css} from '@emotion/react';
import {CSSInterpolation} from '@emotion/serialize';
import {
  ErrorMessage,
  Field,
  FieldConfig,
  GenericFieldHTMLAttributes,
} from 'formik';

export const FieldComponent = ({
  label,
  className,
  fieldCss,
  ...props
}: GenericFieldHTMLAttributes &
  FieldConfig & {label: string; fieldCss?: CSSInterpolation}) => {
  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label htmlFor={props.id}>{label}</label>
      <Field {...props} css={css({resize: 'none'}, fieldCss)} />
      <ErrorMessage name={props.name} component="div" css={{color: 'red'}} />
    </div>
  );
};
