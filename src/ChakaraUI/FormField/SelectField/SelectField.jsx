import { ErrorMessage, useField } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { ChevronDown } from "lucide-react"; /**
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} Option
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} SelectFieldProps
 * @property {string} name
 * @property {string} label
 * @property {Option[]} options
 * @property {string} [placeholder]
 * @property {boolean} [required=false]
 * @property {string} [helpText]
 * @property {boolean} [isMulti=false]
 * @property {number} [limit]
 */

/**
 * @param {SelectFieldProps & import('chakra-react-select').Props} props
 */
const SelectField = ({
  name,
  label,
  options,
  placeholder,
  required = false,
  helpText,
  isMulti = false,
  limit,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  /**
   * @param {Option | Option[] | null} option
   */
  const handleChange = (option) => {
    if (isMulti) {
      if (limit && option.length > limit) {
        return;
      }
      helpers.setValue(option.map((item) => item.value));
    } else {
      helpers.setValue(option ? option.value : null);
    }
  };

  const value = isMulti
    ? options.filter(
        (option) => field.value && field.value.includes(option.value),
      )
    : options.find((option) => option.value === field.value) || null;

  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      <FormLabel
        htmlFor={name}
        color="#646A7A"
        fontSize="14px"
        fontWeight="normal"
      >
        <Flex alignItems="center" gap="3px">
          {label}
          {required && <Text color="#FF0000">*</Text>}
          {helpText && (
            <Text color="#646A7A" fontSize="12px" fontWeight="normal">
              {helpText}
            </Text>
          )}
        </Flex>
      </FormLabel>
      <Select
        {...field}
        id={`select-${name}`}
        instanceId={`select-${name}`}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        value={value}
        closeMenuOnSelect={!isMulti}
        chakraStyles={{
          placeholder: (provided) => ({
            ...provided,
            color: "#646A7A",
            fontSize: "14px",
            fontWeight: "normal",
          }),
          option: (provided) => ({
            ...provided,
            color: "#646A7A",
            fontSize: "14px",
            fontWeight: "normal",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#646A7A",
            fontSize: "14px",
            fontWeight: "normal",
          }),
        }}
        components={{
          DropdownIndicator: () => (
            <Icon mr={2} boxSize="18px" color={"#646A7A"}>
              <ChevronDown />
            </Icon>
          ),
        }}
        selectedOptionStyle="check"
        colorScheme="brand"
        {...rest}
        useBasicStyles
      />
      <FormErrorMessage fontSize="xs" fontWeight="semibold">
        <ErrorMessage name={name} />
      </FormErrorMessage>
    </FormControl>
  );
};

export default SelectField;
