import type {ChangeEvent} from 'react';
import {useFormContext} from 'react-hook-form';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const CheckboxComponent = ({
  id,
  className,
  name,
  label,
  onChange,
}: DefaultProps<{
  id: string;
  name: string;
  label: string;
  onChange?: (v: string) => void;
}>) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <div css={{display: 'flex', alignItems: 'center'}}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="checkbox"
          {...register(name, {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              onChange?.(e.target.value);
            },
          })}
          css={{
            marginLeft: '0.5em',
          }}
        />
      </div>
      {errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};
