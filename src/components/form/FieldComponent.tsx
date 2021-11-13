import {css} from '@emotion/react';
import type {CSSInterpolation} from '@emotion/serialize';
import type {ChangeEvent} from 'react';
import {useFormContext} from 'react-hook-form';
import type {DefaultProps} from 'src/utils/DefaultProps';

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
    formState: {errors},
  } = useFormContext();

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label htmlFor={id}>{label}</label>
      {as == null || as === 'input' ? (
        <input
          id={id}
          {...register(name, {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              onChange?.(e.target.value);
            },
          })}
          css={fieldCss}
        />
      ) : (
        <textarea
          id={id}
          {...register(name, {
            onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
              onChange?.(e.target.value);
            },
          })}
          spellCheck={false}
          css={css({resize: 'none'}, fieldCss)}
        />
      )}
      {errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};
