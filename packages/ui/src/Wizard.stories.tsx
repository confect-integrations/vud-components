import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wizard, WizardItem, WizardDropdownItem } from "./Wizard";

const meta = {
  title: "Components/Wizard",
  component: Wizard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FreeNavigation: Story = {
  name: "With free navigation",
  render: () => (
    <Wizard>
      <WizardItem>Normal</WizardItem>
      <WizardItem>Normal</WizardItem>
      <WizardItem state="active">Active</WizardItem>
      <WizardItem state="disabled">Disabled</WizardItem>
      <WizardItem>Normal</WizardItem>
      <WizardDropdownItem>
        <WizardItem state="disabled" role="menuitem">Disabled</WizardItem>
        <WizardItem role="menuitem">Normal</WizardItem>
        <WizardItem role="menuitem">Normal</WizardItem>
      </WizardDropdownItem>
    </Wizard>
  ),
};

export const RestrictedNavigation: Story = {
  name: "With restricted navigation",
  render: () => (
    <Wizard>
      <WizardItem state="visited">Visited</WizardItem>
      <WizardItem state="visited">Visited</WizardItem>
      <WizardItem state="active">Active</WizardItem>
      <WizardItem>Normal</WizardItem>
      <WizardItem state="disabled">Disabled</WizardItem>
      <WizardDropdownItem>
        <WizardItem state="disabled" role="menuitem">Disabled</WizardItem>
        <WizardItem role="menuitem">Normal</WizardItem>
        <WizardItem role="menuitem">Normal</WizardItem>
      </WizardDropdownItem>
    </Wizard>
  ),
};
