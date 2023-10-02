import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "@components/Dropdown";
import { useState } from "react";
import { LabelValue } from "@/type-utils/listbox";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options: LabelValue[] = [
  { label: "Berlin", value: "Berlin" },
  { label: "Frankfurt", value: "Frankfurt" },
  { label: "Hamburg", value: "Hamburg" },
  { label: "Munich", value: "Munich" },
  { label: "Skopje", value: "Skopje" },
  { label: "Belgrade", value: "Belgrade" },
];

export const Basic: Story = {
  render: BasicDropdown,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

function BasicDropdown() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={(e) => {
        setValue(e.value);
      }}
      showClear
    />
  );
}
