import { Combobox } from 'react-widgets';
const FormErrorMsg = ({ errors, name }) => {
  return (
    errors[name] && (
      <div className='invalid-feedback'>{errors?.[name]?.message}</div>
    )
  );
};
export const Input = ({
  register,
  errors,
  id,
  type,
  labelText,
  rules,
  placeholder = '',
  onChange,
}) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, rules)}
        onChange={onChange}
      />
      <FormErrorMsg errors={errors} name={id} />
    </>
  );
};

export const Textarea = ({
  register,
  errors,
  labelText,
  id,
  rowNum,
  rules,
  placeholder = '',
}) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <textarea
        id={id}
        rows={rowNum}
        placeholder={placeholder}
        className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, rules)}
      />
      <FormErrorMsg errors={errors} name={id} />
    </>
  );
};

export const CheckboxRadio = ({
  register,
  errors,
  type,
  name,
  id,
  value,
  rules,
  labelText,
  hasErrorMsg,
}) => {
  return (
    <div className='form-check'>
      <input
        className={`form-check-input ${errors[name] ? 'is-invalid' : ''}`}
        type={type}
        id={id}
        value={value}
        {...register(name, rules)}
      />
      <label className='form-check-label' htmlFor={id}>
        {labelText}
      </label>

      {hasErrorMsg && <FormErrorMsg errors={errors} name={name} />}
    </div>
  );
};

export const Selectbox = ({
  Controller,
  control,
  data,
  labelText,
  id,
  placeholder,
  rules,
}) => {
  return (
    <>
      <label className='w-100 form-label' htmlFor={`${id}_input`}>
        {labelText}
      </label>
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <div>
            <Combobox
              id={id}
              name={id}
              placeholder={placeholder}
              data={data}
              value={value}
              onChange={onChange}
              messages={{ emptyFilter: '目前無此分類' }}
              onBlur={onBlur}
              inputProps={{
                className: `form-control ${error?.message ? 'is-invalid' : ''}`,
              }}
            />
            {<div className='invalid-feedback d-block'>{error?.message}</div>}
          </div>
        )}
      />
    </>
  );
};

export const Select = ({
  register,
  errors,
  labelText,
  id,
  rules,
  disabled,
  children,
}) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      <FormErrorMsg errors={errors} name={id} />
    </>
  );
};
