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
     options: TSelectOption; 
}

const PHSelect = ({ label, name, options }:TPHSelectProps) => {
  return (
    <Controller
    name={name}
    render={({ field, fieldState : {error} }) => (
      <Form.Item label={label}>
        <Select
          style={{ width: '100%' }}
          {...field}
          options={options}
          size="large"
        />
        {error && <small style={{color: 'red'}}>{error.message}</small>}
      </Form.Item>
    )}
  />
  );
};

export default PHSelect;
