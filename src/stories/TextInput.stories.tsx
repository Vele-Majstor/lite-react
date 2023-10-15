import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "@components/TextInput/TextInput";

const meta: Meta<typeof TextInput> = {
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {
  render: () => (
    <>
      <TextInput
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
      <TextInput
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
      <TextInput
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
      <TextInput
        id="primary"
        label="Label for input"
        helperText="Helper text"
        placeholder="Placeholder text"
        light
      />
    </>
  ),
};
