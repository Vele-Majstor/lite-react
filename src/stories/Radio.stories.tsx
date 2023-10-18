import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Title } from "@storybook/blocks";

import RadioButtonGroup from "@components/RadioButtonGroup";
import RadioButton from "@components/RadioButton";

const meta: Meta<typeof RadioButtonGroup> = {
  component: RadioButtonGroup,
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
type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  render: (args) => {
    return (
      <RadioButtonGroup {...args}>
        <RadioButton
          name="radio"
          labelText="Radio button label"
          value="radio-1"
          id="radio-1"
        />
        <RadioButton
          name="radio"
          labelText="Radio button label"
          value="radio-2"
          id="radio-2"
        />
        <RadioButton
          name="radio"
          labelText="Radio button label"
          value="radio-3"
          id="radio-3"
        />
      </RadioButtonGroup>
    );
  },
  args: { legendText: "Legend text" },
};
