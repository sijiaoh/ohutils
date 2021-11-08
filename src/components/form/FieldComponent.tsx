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
}: DefaultProps<{
  id: string;
  name: string;
  label: string;
  fieldCss?: CSSInterpolation;
  as?: 'input' | 'textarea';
}>) => {
  const {
    register,
    formState: {errors},
  } = useFormContext();

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label htmlFor={id}>{label}</label>
      {as == null || as === 'input' ? (
        <input id={id} {...register(name)} css={fieldCss} />
      ) : (
        <textarea
          id={id}
          {...register(name)}
          css={css({resize: 'none'}, fieldCss)}
        />
      )}
      {errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};
