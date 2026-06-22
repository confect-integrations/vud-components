import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="max-w-xl">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanel value="overview">
        <p>A summary of the account, recent invoices and balance.</p>
      </TabPanel>
      <TabPanel value="activity">
        <p>A chronological feed of everything that happened.</p>
      </TabPanel>
      <TabPanel value="settings">
        <p>Preferences, members and billing configuration.</p>
      </TabPanel>
    </Tabs>
  ),
};
