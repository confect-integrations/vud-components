import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown, DropdownItem, DropdownDivider } from "./Dropdown";
import { Button } from "./Button";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: { trigger: null },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="pb-48"><Story /></div>],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown trigger={<Button>Actions</Button>}>
      <DropdownItem onClick={() => {}}>Edit</DropdownItem>
      <DropdownItem onClick={() => {}}>Duplicate</DropdownItem>
      <DropdownItem disabled>Move (unavailable)</DropdownItem>
      <DropdownDivider />
      <DropdownItem destructive onClick={() => {}}>Delete</DropdownItem>
    </Dropdown>
  ),
};
