import {
  Box,
  Divider,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

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

  return (
    <Flex direction={"column"} gap={6}>
      <Stepper index={stepper.activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
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
          return <Form>{children({ stepper, formikProps })}</Form>;
        }}
      </Formik>
    </Flex>
  );
}

export default MultiStepperForm;
