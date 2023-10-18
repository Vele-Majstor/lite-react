import type { Meta, StoryObj } from "@storybook/react";

import TextArea from "@components/TextArea/TextArea";
import { Canvas, Controls, Title } from "@storybook/blocks";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />

          <Canvas of={Basic} />
          <Controls of={Basic} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  render: (args) => (
    <>
      <TextArea {...args} />
    </>
  ),
  args: {
    id: "primary",
    label: "Label for input",
    helperText: "Helper text",
    placeholder: "Placeholder text",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <>
      <TextArea {...args} />
    </>
  ),
  args: { ...Basic.args, disabled: true },
};

export const Invalid: Story = {
  render: (args) => (
    <>
      <TextArea {...args} />
    </>
  ),
  args: { ...Basic.args, invalid: true },
};

export const Light: Story = {
  render: (args) => (
    <>
      <TextArea {...args} />
    </>
  ),
  args: { ...Basic.args, light: true },
};
