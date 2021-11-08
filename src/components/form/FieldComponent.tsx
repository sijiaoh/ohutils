import {css} from '@emotion/react';
import {CSSInterpolation} from '@emotion/serialize';
import {useFormContext} from 'react-hook-form';
import {DefaultProps} from 'src/utils/DefaultProps';

export const FieldComponent = ({
  id,
  className,
  name,
  label,
  fieldCss,
  as,
  onChange,
}: DefaultProps<{
  id: string;
  name: string;
  label: string;
  fieldCss?: CSSInterpolation;
  as?: 'input' | 'textarea';
  onChange?: (v: string) => void;
}>) => {
  const {
    register,
    getValues,
    formState: {errors},
  } = useFormContext();

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label htmlFor={id}>{label}</label>
      {as == null || as === 'input' ? (
        <input
          id={id}
          {...register(name, {
            onChange: () => {
              onChange?.(getValues()[name]);
            },
          })}
          css={fieldCss}
        />
      ) : (
        <textarea
          id={id}
          {...register(name, {
            onChange: () => {
              onChange?.(getValues()[name]);
            },
          })}
          css={css({resize: 'none'}, fieldCss)}
        />
      )}
      {errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};
