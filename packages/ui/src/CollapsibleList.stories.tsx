import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListContainer, ListGroup, ListGroupItem } from "./CollapsibleList";

const meta = {
  title: "Components/CollapsibleList",
  component: ListContainer,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ListContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ListContainer>
      <ListGroup title="First Group Title">
        <ListGroupItem title="Item 1.1" defaultOpen>
          Some Text 1.1
        </ListGroupItem>
        <ListGroupItem title="Item 1.2">Some Text 1.2</ListGroupItem>
      </ListGroup>
      <ListGroup title="Second Group Title">
        <ListGroupItem title="Item 2.1">Some Text 2.1</ListGroupItem>
      </ListGroup>
    </ListContainer>
  ),
};

export const Collapsed: Story = {
  name: "Groups collapsed",
  render: () => (
    <ListContainer>
      <ListGroup title="First Group Title" defaultOpen={false}>
        <ListGroupItem title="Item 1.1">Some Text 1.1</ListGroupItem>
        <ListGroupItem title="Item 1.2">Some Text 1.2</ListGroupItem>
      </ListGroup>
      <ListGroup title="Second Group Title" defaultOpen={false}>
        <ListGroupItem title="Item 2.1">Some Text 2.1</ListGroupItem>
      </ListGroup>
    </ListContainer>
  ),
};

export const RichContent: Story = {
  name: "Rich item content",
  render: () => (
    <ListContainer>
      <ListGroup title="Account settings">
        <ListGroupItem title="Profile" defaultOpen>
          <p className="mb-2">Update the name and email shown across the app.</p>
          <p>Changes apply immediately to every connected device.</p>
        </ListGroupItem>
        <ListGroupItem title="Security">
          Manage your password, two-factor authentication and active sessions.
        </ListGroupItem>
      </ListGroup>
    </ListContainer>
  ),
};
