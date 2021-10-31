import {Formik, Form, FormikConfig, useFormikContext} from 'formik';
import {useEffect, useRef} from 'react';
import {DefaultProps} from 'src/utils/DefaultProps';

type Props<T> = DefaultProps<{onChange?: (values: T) => void}>;

function FormWrapper<T>({onChange, className, children}: Props<T>) {
  const {values} = useFormikContext<T>();
  const oc = useRef(onChange).current;

  useEffect(() => {
    oc?.(values);
  }, [oc, values]);

  return (
    <Form
      className={className}
      css={{display: 'flex', flexDirection: 'column'}}
    >
      {children}
    </Form>
  );
}

export function FormComponent<T>({
  onChange,
  className,
  children,
  ...props
}: FormikConfig<T> & Props<T>) {
  return (
    <Formik {...props}>
      <FormWrapper className={className} onChange={onChange}>
        {children}
      </FormWrapper>
    </Formik>
  );
}
