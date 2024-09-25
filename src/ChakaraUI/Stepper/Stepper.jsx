import React from "react";
import {
  Box,
  Divider,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useBreakpointValue,
  useSteps,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

const ResponsiveStepContent = ({ title, description, isMobile }) => (
  <Flex
    direction="column"
    alignItems={isMobile ? "center" : "flex-start"}
    flexGrow={1}
    minWidth="0"
    mr={isMobile ? 0 : 4}
    mt={isMobile ? 2 : 0}
    textAlign={isMobile ? "center" : "left"}
  >
    <Text
      as="span"
      fontSize={["clamp(12px, 2.5vw, 14px)"]}
      fontWeight="bold"
      mb={1}
      whiteSpace="normal"
      overflow="hidden"
      textOverflow="ellipsis"
      maxWidth="100%"
    >
      {title}
    </Text>
    <Text
      fontSize={["clamp(10px, 2vw, 12px)"]}
      color="gray.600"
      whiteSpace="normal"
      overflow="hidden"
      textOverflow="ellipsis"
      maxWidth="100%"
    >
      {description}
    </Text>
  </Flex>
);

function MultiStepperForm({
  steps,
  children,
  validations,
  handleSubmit,
  initialValues,
}) {
  const stepper = useSteps({
    index: 0,
    count: steps.length,
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction={isMobile ? "row" : "column"} gap={6}>
      <Stepper
        index={stepper.activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        height={isMobile ? "auto" : "100px"}
        gap="0"
      >
        {steps.map((step, index) => (
          <Step key={index} flexShrink={0}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink={1} minWidth="0" maxWidth="100%">
              <ResponsiveStepContent
                title={step.title}
                description={step.description}
                isMobile={isMobile}
              />
            </Box>
            {!isMobile && <StepSeparator />}
          </Step>
        ))}
      </Stepper>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={
          Array.isArray(validations)
            ? validations[stepper.activeStep]
            : validations
        }
        onSubmit={(values, actions) => handleSubmit(values, actions, stepper)}
      >
        {(formikProps) => {
          return (
            <Form style={{ height: "100%" }}>
              {children({ stepper, formikProps })}
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default MultiStepperForm;
