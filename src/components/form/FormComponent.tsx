import {useRef} from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormProps,
} from 'react-hook-form';
import type {DefaultProps} from 'src/utils/DefaultProps';

interface OnChange<T> {
  (v: T): void | Promise<void>;
}

function FormWrapper<T>({
  className,
  children,
  onChange,
  onSubmit,
}: DefaultProps<{
  onChange: OnChange<T> | undefined;
  onSubmit: SubmitHandler<T>;
}>) {
  const {getValues, handleSubmit} = useFormContext<T>();
  const oc = useRef(onChange).current;

  return (
    <form
      className={className}
      css={{display: 'flex', flexDirection: 'column'}}
      onChange={() => {
        oc?.(getValues() as T);
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}

export function FormComponent<T>({
  className,
  children,
  onChange,
  onSubmit,
  ...props
}: UseFormProps<T> &
  DefaultProps<{onChange?: OnChange<T>; onSubmit: SubmitHandler<T>}>) {
  const methods = useForm({mode: 'onChange', ...props});

  return (
    <FormProvider {...methods}>
      <FormWrapper
        className={className}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        {children}
      </FormWrapper>
    </FormProvider>
  );
}
