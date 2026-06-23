import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "./Button";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    as: { control: "inline-radio", options: ["div", "button", "a"] },
    variant: { control: "select", options: ["default", "secondary", "primary"] },
    title: { control: "text" },
    row: { control: "boolean" },
    interactive: { control: "boolean" },
    selected: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    title: "Card title",
    interactive: false,
    row: false,
    selected: false,
    children: "This is the body of a basic card.",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = {
  args: { title: undefined, children: "A card with no title — just body content." },
};

export const Interactive: Story = {
  args: { interactive: true, title: "Clickable card", children: "Hover me." },
};

export const Selected: Story = {
  args: { selected: true, title: "Selected card", children: "Shows the green accent bar." },
};

export const Secondary: Story = {
  args: { variant: "secondary", title: "Secondary", children: "Grey-fill surface." },
};

export const Row: Story = {
  args: {
    row: true,
    title: undefined,
    children: (
      <>
        <span>Row layout — content left</span>
        <span className="font-bold">action right</span>
      </>
    ),
  },
};

export const AsButton: Story = {
  args: { as: "button", interactive: true, title: undefined, children: "I am a <button>" },
};

/** Composed from the CardHeader / CardTitle / CardContent / CardAction / CardFooter parts. */
export const Composed: Story = {
  args: { title: undefined, children: undefined },
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <div>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>Manage who can access this project.</CardDescription>
        </div>
        <CardAction>
          <Button size="md" variant="link">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        Members inherit the workspace role unless overridden here. Changes apply immediately.
      </CardContent>
      <CardFooter>
        <Button size="md" variant="primary">
          Save
        </Button>
        <Button size="md">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};
