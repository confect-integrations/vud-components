import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup } from "./FormGroup";
import { Input } from "./Input";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

const meta = {
  title: "Forms/FormGroup",
  component: FormGroup,
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
  },
  args: { label: "Email", required: true, helperText: "We'll never share it.", children: null },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormGroup {...args}>
      <Input type="email" placeholder="name@example.com" />
    </FormGroup>
  ),
};

export const WithError: Story = {
  name: "With error",
  args: { error: "Enter a valid email address.", helperText: undefined },
  render: (args) => (
    <FormGroup {...args}>
      <Input type="email" defaultValue="not-an-email" />
    </FormGroup>
  ),
};

export const Fields: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <FormGroup label="Full name" required>
        <Input placeholder="Jane Doe" />
      </FormGroup>
      <FormGroup label="Country" helperText="Where you are billed.">
        <Select placeholder="Choose…" options={[{ value: "se", label: "Sweden" }, { value: "no", label: "Norway" }]} defaultValue="" />
      </FormGroup>
      <FormGroup label="Notes" error="This field is required.">
        <TextArea placeholder="Add a note" />
      </FormGroup>
    </div>
  ),
};
