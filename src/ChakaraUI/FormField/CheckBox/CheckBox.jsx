import { ErrorMessage, Field } from "formik";
import { Checkbox, FormControl, Text } from "@chakra-ui/react";

const CheckboxField = ({ name, label }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <FormControl
        isInvalid={!!(meta.error && meta.touched)}
        display={"flex"}
        alignItems={"center"}
      >
        <Checkbox
          {...field}
          isChecked={field.value}
          fontSize={"14px"}
          fontWeight="normal"
          colorScheme={"green"}
          color={"#646A7A"}
          css={{
            "& .chakra-checkbox__control": {
              borderWidth: "0.5px",
              borderColor: "#646A7A",
            },
          }}
        >
          {label}
        </Checkbox>
        <ErrorMessage name={name} component={Text} color="red.500" />
      </FormControl>
    )}
  </Field>
);

export default CheckboxField;
