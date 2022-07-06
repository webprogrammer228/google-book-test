import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
type OptionsType = {
  options: {
    value: string;
    name: string;
  }[];
  value: string;
  onChange: (category: string) => void;
};

const Select = ({ options, value, onChange }: OptionsType) => {
  return (
    <MySelect value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={uuidv4()} value={option.value}>
          {option.name}
        </option>
      ))}
    </MySelect>
  );
};

export default Select;

const MySelect = styled.select`
  padding: 5px;
  margin-bottom: 5px;
`;
