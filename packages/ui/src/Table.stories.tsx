import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableRow } from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  argTypes: {
    active: { control: "boolean" },
    hover: { control: "boolean" },
    condensed: { control: "boolean" },
    responsive: { control: "boolean" },
  },
  args: { active: false, hover: false, condensed: false, responsive: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { id: 1, first: "Mark", last: "Otto", user: "@mdo" },
  { id: 2, first: "Jacob", last: "Thornton", user: "@fat" },
  { id: 3, first: "Larry", last: "the Bird", user: "@twitter" },
  { id: 4, first: "Stan", last: "Lucas", user: "@mdo" },
  { id: 5, first: "Ben", last: "Johnas", user: "@fat" },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <th scope="row">{r.id}</th>
            <td>{r.first}</td>
            <td>{r.last}</td>
            <td>{r.user}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Hover: Story = { ...Default, args: { hover: true } };

export const Condensed: Story = { ...Default, args: { condensed: true } };

export const SelectedRow: Story = {
  name: "Selected row",
  render: (args) => (
    <Table {...args} hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <TableRow key={r.id} active={r.id === 3}>
            <th scope="row">{r.id}</th>
            <td>{r.first}</td>
            <td>{r.last}</td>
            <td>{r.user}</td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};
