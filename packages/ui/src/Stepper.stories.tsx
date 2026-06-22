import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper, StepperStep } from "./Stepper";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: {
    transition: { control: "boolean" },
    vertical: { control: "boolean" },
    small: { control: "boolean" },
  },
  args: { transition: false, vertical: false, small: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stepper {...args}>
      <StepperStep stepTitle="Step 1 title" stepType="passed" />
      <StepperStep stepTitle="Step 2 title" stepType="active" />
      <StepperStep stepTitle="Step 3 title" />
    </Stepper>
  ),
};

export const Vertical: Story = {
  args: { vertical: true },
  render: (args) => (
    <Stepper {...args}>
      <StepperStep stepTitle="Account details" stepType="passed" />
      <StepperStep stepTitle="Company info" stepType="passed" />
      <StepperStep stepTitle="Billing" stepType="active" />
      <StepperStep stepTitle="Confirmation" />
    </Stepper>
  ),
};

export const Small: Story = {
  args: { small: true },
  render: (args) => (
    <Stepper {...args}>
      <StepperStep stepTitle="One" stepType="passed" />
      <StepperStep stepTitle="Two" stepType="passed" />
      <StepperStep stepTitle="Three" stepType="active" />
      <StepperStep stepTitle="Four" />
      <StepperStep stepTitle="Five" />
    </Stepper>
  ),
};
