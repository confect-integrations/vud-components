import type { Preview } from "@storybook/react-vite";

// Tailwind utilities (scanned from src) + global component CSS + VUD icons.
import "./preview.css";

const preview: Preview = {
  // Generate a Docs page for every component.
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
