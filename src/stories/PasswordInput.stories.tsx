import type { Meta, StoryObj } from "@storybook/react";

import PasswordInput from "@components/PasswordInput/PasswordInput";
import { Canvas, Controls, Title } from "@storybook/blocks";

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
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
type Story = StoryObj<typeof PasswordInput>;

export const Basic: Story = {
  render: (args) => (
    <>
      <PasswordInput {...args} />
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
      <PasswordInput {...args} />
    </>
  ),
  args: { ...Basic.args, disabled: true },
};

export const Invalid: Story = {
  render: (args) => (
    <>
      <PasswordInput {...args} />
    </>
  ),
  args: { ...Basic.args, invalid: true },
};

export const Light: Story = {
  render: (args) => (
    <>
      <PasswordInput {...args} />
    </>
  ),
  args: { ...Basic.args, light: true },
};
