import Button from 'react-bootstrap/Button';
import {useFieldArray, useFormContext} from 'react-hook-form';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const FieldArrayComponent = ({
  className,
  name,
  label,
  addButtonText = '追加',
}: DefaultProps<{
  name: string;
  label: string;
  addButtonText?: string;
}>) => {
  const {
    control,
    register,
    formState: {errors},
  } = useFormContext();
  const {fields, append, remove, insert} = useFieldArray({
    control,
    name,
  });

  return (
    <div className={className} css={{display: 'flex', flexDirection: 'column'}}>
      <label>{label}</label>
      <div css={{display: 'flex', flexDirection: 'column'}}>
        {fields.map((field, index) => (
          <div key={field.id} css={{display: 'flex'}}>
            <input {...register(`${name}.${index}.value`)} css={{flex: 1}} />
            <Button
              onClick={() => {
                remove(index);
              }}
              variant="secondary"
              size="sm"
            >
              -
            </Button>
            <Button
              onClick={() => {
                insert(index, {value: ''});
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
            append({value: ''});
          }}
          variant="secondary"
          size="sm"
        >
          {addButtonText}
        </Button>
      </div>
      {errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};
