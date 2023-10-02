import type { Preview } from "@storybook/react";
import React from "react";

import "../src/styles/colors.css";
import "../src/styles/spacing.css";
import "../src/styles/layout.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "3em",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
