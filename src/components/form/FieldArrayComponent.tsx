import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayConfig,
  GenericFieldHTMLAttributes,
  useFormikContext,
} from 'formik';
import Button from 'react-bootstrap/Button';

export const FieldArrayComponent = ({
  label,
  className,
  addButtonText = '追加',
  ...props
}: GenericFieldHTMLAttributes &
  FieldArrayConfig & {
    label: string;
    addButtonText?: string;
  }) => {
  const formikContext = useFormikContext<{[key: string]: string[]}>();
  const values = formikContext.values[props.name];

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label htmlFor={props.id}>{label}</label>
      <FieldArray {...props}>
        {arrayHelpers => (
          <div css={{display: 'flex', flexDirection: 'column'}}>
            {values?.map((_, index) => (
              <div key={index} css={{display: 'flex'}}>
                <Field name={`${props.name}.${index}`} css={{flex: 1}} />
                <Button
                  onClick={() => {
                    arrayHelpers.remove(index);
                  }}
                  variant="secondary"
                  size="sm"
                >
                  -
                </Button>
                <Button
                  onClick={() => {
                    arrayHelpers.insert(index, '');
                  }}
                  variant="secondary"
                  size="sm"
                >
                  +
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                arrayHelpers.push('');
              }}
              variant="secondary"
              size="sm"
            >
              {addButtonText}
            </Button>
          </div>
        )}
      </FieldArray>
      <ErrorMessage name={props.name} component="div" css={{color: 'red'}} />
    </div>
  );
};
