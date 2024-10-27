import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";

/**
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} [props.label] - Field label
 * @param {string} [props.type="text"] - Input type
 * @param {boolean} [props.isNumber=false] - Whether the input should only accept numbers
 * @param {string} [props.placeholder] - Input placeholder
 * @param {React.ReactNode} [props.leftIcon] - Icon to display on the left side of the input
 * @param {React.ReactNode} [props.rightIcon] - Icon to display on the right side of the input
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {string} [props.labelColor="#646A7A"] - Color for the label text
 * @param {string} [props.placeholderColor="#646A7A"] - Color for the placeholder text
 */

const InputField = ({
  name,
  label,
  type = "text",
  isNumber = false,
  isString = false,
  placeholder,
  leftIcon,
  rightIcon,
  required = false,
  labelColor = "#646A7A",
  placeholderColor = "#646A7A",
  ...props
}) => (
  <Field name={name}>
    {
      /**
       * @param {import('./types').FieldProps} fieldProps
       * @returns {React.ReactElement}
       */
      ({ field, meta }) => (
        <FormControl isInvalid={!!(meta.error && meta.touched)}>
          <FormLabel
            htmlFor={name}
            color={labelColor}
            fontSize={"14px"}
            fontWeight="normal"
          >
            <Flex alignItems="center" gap="3px">
              {label}
              {required && <Text color="#FF0000">*</Text>}
            </Flex>
          </FormLabel>
          <InputGroup>
            {leftIcon && (
              <InputLeftElement pointerEvents="auto">
                {leftIcon}
              </InputLeftElement>
            )}
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              borderRadius="5px"
              color={labelColor}
              onInput={
                isNumber
                  ? (e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }
                  : isString
                    ? (e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z\s]/g,
                          ""
                        );
                      }
                    : undefined
              }
              {...props}
              _placeholder={{
                color: placeholderColor,
                fontSize: "12px",
                fontWeight: "normal",
              }}
            />
            {rightIcon && (
              <InputRightElement pointerEvents="auto">
                {rightIcon}
              </InputRightElement>
            )}
          </InputGroup>
          <FormErrorMessage fontSize="xs" fontWeight="semibold">
            <ErrorMessage name={name} />
          </FormErrorMessage>
        </FormControl>
      )
    }
  </Field>
);

export default InputField;
