import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Title } from "@storybook/blocks";

import ToggleButton from "@components/ToggleButton";
import { useState } from "react";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />

          <Canvas of={Default} />
          <Controls of={Default} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  render: (args) => {
    const [toggled, setToggled] = useState(false);
    return (
      <ToggleButton
        {...args}
        checked={toggled}
        onChange={(e) => setToggled(e.value)}
      />
    );
  },
  args: { id: "toggle_button" },
};
