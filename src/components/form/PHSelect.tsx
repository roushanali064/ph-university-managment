import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

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
}

const PHSelect = ({ label, name, options, disabled, mode }:TPHSelectProps) => {
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
  );
};

export default PHSelect;
