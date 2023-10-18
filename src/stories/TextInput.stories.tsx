import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "@components/TextInput/TextInput";
import { Canvas, Controls, Title } from "@storybook/blocks";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
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
type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {
  render: (args) => (
    <>
      <TextInput {...args} />
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
      <TextInput {...args} />
    </>
  ),
  args: { ...Basic.args, disabled: true },
};

export const Invalid: Story = {
  render: (args) => (
    <>
      <TextInput {...args} />
    </>
  ),
  args: { ...Basic.args, invalid: true },
};

export const Light: Story = {
  render: (args) => (
    <>
      <TextInput {...args} />
    </>
  ),
  args: { ...Basic.args, light: true },
};
