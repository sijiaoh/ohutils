import {Formik, Form, FormikConfig} from 'formik';
import {DefaultProps} from 'src/utils/DefaultProps';

export function FormComponent<T>({
  className,
  children,
  ...props
}: FormikConfig<T> & DefaultProps) {
  return (
    <Formik {...props}>
      <Form
        className={className}
        css={{display: 'flex', flexDirection: 'column'}}
      >
        {children}
      </Form>
    </Formik>
  );
}
