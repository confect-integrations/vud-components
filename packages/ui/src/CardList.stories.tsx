import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardList } from "./CardList";
import { Card } from "./Card";
import { Button } from "./Button";
import { Icon } from "./Icon";

const meta = {
  title: "Components/CardList",
  component: CardList,
  argTypes: {
    as: { control: "inline-radio", options: ["div", "ul"] },
    variant: { control: "select", options: ["default", "secondary", "primary"] },
    orientation: { control: "inline-radio", options: ["list", "grid"] },
    columns: { control: { type: "number", min: 1, max: 6 } },
    hoverable: { control: "boolean" },
  },
  args: { variant: "default", orientation: "list", columns: 3, hoverable: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof CardList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = ["First", "Second", "Third"];

export const Default: Story = {
  render: (args) => (
    <CardList {...args}>
      {items.map((t) => (
        <Card key={t} title={t}>
          Content for the {t.toLowerCase()} card.
        </Card>
      ))}
    </CardList>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["default", "secondary", "primary"] as const).map((v) => (
        <div key={v}>
          <p className="mb-2 text-sm font-bold capitalize">{v}</p>
          <CardList variant={v}>
            <Card>Content …</Card>
            <Card selected>Content … (selected)</Card>
            <Card>Content …</Card>
          </CardList>
        </div>
      ))}
    </div>
  ),
};

export const UnorderedList: Story = {
  render: () => (
    <CardList as="ul">
      {items.map((t) => (
        <Card key={t} as="li">
          {t}
        </Card>
      ))}
    </CardList>
  ),
};

export const Clickable: Story = {
  render: () => (
    <CardList hoverable>
      {items.map((t) => (
        <Card key={t} as="button" onClick={() => {}}>
          {t} — click me
        </Card>
      ))}
    </CardList>
  ),
};

export const Columns: Story = {
  render: () => (
    <CardList orientation="grid" columns={4}>
      {["One", "Two", "Three", "Four", "Five"].map((t) => (
        <Card key={t} className="text-center">
          Content …
        </Card>
      ))}
    </CardList>
  ),
};

// ---- Product example (composed from the extended Card) ----

type Product = {
  name: string;
  image: string;
  article: string;
  delivery: string;
  price: string;
  original: string;
};

const products: Product[] = [
  { name: "Air balloon", image: "/images/baloon.jpg", article: "101", delivery: "1-7", price: "390,00", original: "400,00" },
  { name: "Apple waste", image: "/images/apple.jpg", article: "102", delivery: "5-9", price: "670,00", original: "800,00" },
  { name: "Bicycle", image: "/images/bike.jpg", article: "103", delivery: "1-3", price: "170,00", original: "185,00" },
];

const ProductCard = ({ p }: { p: Product }) => (
  <Card row className="!items-stretch gap-6">
    <div className="flex flex-1 items-start gap-6">
      {/* thumbnail */}
      <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden border border-[#8a8a8a] bg-[#f2f2f2] px-2 text-center text-xs text-[#6f7271]">
        {p.name}
      </div>
      <div className="min-w-[9rem]">
        <a href="#" className="font-bold text-[#116fae] hover:underline">
          Item x - 12 Pieces
        </a>
        <p className="text-sm">Article number {p.article}</p>
        <span className="mt-1 flex gap-1 text-[#6f7271]">
          <Icon name="info" size="sm" filled label="info" />
          <Icon name="settings" size="sm" />
        </span>
      </div>
      <div className="text-sm">
        <p className="font-bold">Model type</p>
        <p>Article number {p.article} Office use</p>
      </div>
      <div className="text-sm">
        <p>Delivery time {p.delivery}</p>
        <p>Working days</p>
      </div>
      <div className="text-sm">
        <p className="mb-1">Unit price</p>
        <input
          type="number"
          defaultValue={0}
          className="h-8 w-20 rounded-lg border border-[#8a8a8a] px-2"
        />
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-4">
      <div className="text-right">
        <p className="text-lg font-bold">
          {p.price} <span className="text-sm font-normal">SEK</span>
        </p>
        <p className="text-sm text-[#6f7271]">{p.original} SEK</p>
      </div>
      <Button variant="primary">Confirm</Button>
      <input type="checkbox" className="size-4" aria-label={`Select ${p.name}`} />
    </div>
  </Card>
);

export const Example: Story = {
  name: "Example (product list)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <CardList className="p-6">
      {products.map((p) => (
        <ProductCard key={p.article} p={p} />
      ))}
    </CardList>
  ),
};
