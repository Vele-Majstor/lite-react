import type { Preview } from "@storybook/react";

import "../src/styles/colors.css";
import "../src/styles/spacing.css";
import "../src/styles/layout.css";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: { date: /Date$/ },
            expanded: true,
        },
    },
};

export default preview;
