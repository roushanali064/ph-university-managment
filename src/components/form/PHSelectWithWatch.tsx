import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export type TSelectOption = {
    value: string;
     label: string;
      disable?: boolean
}[]

type TPHSelectProps = {
     label: string; 
     name: string;
     options: TSelectOption | undefined; 
     disabled?: boolean;
     mode?: "multiple" | "tags" | undefined;
     onValueChange: React.Dispatch<React.SetStateAction<string>>;
}

const PHSelectWithWatch = ({ label, name, options, disabled, mode, onValueChange }:TPHSelectProps) => {

  const {control} = useFormContext()

  const inputValue = useWatch({
    control,
    name
  })

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
    name={name}
    render={({ field, fieldState : {error} }) => (
      <Form.Item label={label}>
        <Select
        mode={mode}
          style={{ width: '100%' }}
          {...field}
          size="large"
          disabled={disabled}
          options={options}
        />
        {error && <small style={{color: 'red'}}>{error.message}</small>}
      </Form.Item>
    )}
  />
  )
};

export default PHSelectWithWatch;
