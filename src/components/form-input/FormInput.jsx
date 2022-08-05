import React from "react";

import { Group, FormInpt, FormInputLabel } from "./form-input.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group className="group">
      <FormInpt className="form-input" {...otherProps} />
      {label && <FormInputLabel>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
