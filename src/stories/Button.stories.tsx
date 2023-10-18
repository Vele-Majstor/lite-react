import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

import Button from "@components/Button/Button";
import XIcon from "@/icons/XIcon";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />

          <Canvas of={Customize} />
          <Controls of={Customize} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Severity: Story = {
  render: () => (
    <>
      <Button id="primary" severity="primary" label="Primary" />
      <Button severity="secondary" label="Secondary" />
      <Button severity="tertiary" label="Tertiary" />
      <Button severity="ghost" label="Ghost" />
      <Button severity="danger" label="Danger" />
    </>
  ),
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

export const Size: Story = {
  render: () => (
    <>
      <Button severity="primary" size="small" label="Primary" />
      <Button severity="primary" size="field" label="Primary" />
      <Button severity="primary" size="normal" label="Primary" />
    </>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          margin: "3em",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Icon: Story = {
  render: () => (
    <>
      <Button severity="primary" icon={<XIcon />} label="Label with icon" />
      <Button severity="primary" icon={<XIcon />} iconTooltip="Icon only" />
    </>
  ),
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

export const Customize: Story = {
  render: (args) => <Button {...args} />,
  args: {
    severity: "primary",
    label: "Edit me",
  },
};
