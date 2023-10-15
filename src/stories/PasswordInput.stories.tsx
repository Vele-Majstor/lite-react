import type { Meta, StoryObj } from "@storybook/react";

import PasswordInput from "@components/PasswordInput/PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Basic: Story = {
  render: () => (
    <>
      <PasswordInput
        id="primary"
        label="Label for input"
        helperText="Helper text"
        placeholder="Placeholder text"
      />
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <PasswordInput
        id="primary"
        label="Label for input"
        helperText="Helper text"
        placeholder="Placeholder text"
        disabled
      />
    </>
  ),
};

export const Invalid: Story = {
  render: () => (
    <>
      <PasswordInput
        id="primary"
        label="Label for input"
        helperText="Helper text"
        placeholder="Placeholder text"
        invalid
      />
    </>
  ),
};

export const Light: Story = {
  render: () => (
    <>
      <PasswordInput
        id="primary"
        label="Label for input"
        helperText="Helper text"
        placeholder="Placeholder text"
        light
      />
    </>
  ),
};
