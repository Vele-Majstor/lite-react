import type { Meta, StoryObj } from "@storybook/react";

import ComboBox from "@/components/ComboBox";
import { useState } from "react";
import { LabelValue } from "@/type-utils/listbox";
import { Canvas, Controls, Title } from "@storybook/blocks";

const meta: Meta<typeof ComboBox> = {
  component: ComboBox,
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
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

const options: LabelValue[] = [
  { label: "Berlin", value: "Berlin" },
  { label: "Frankfurt", value: "Frankfurt" },
  { label: "Hamburg", value: "Hamburg" },
  { label: "Munich", value: "Munich" },
  { label: "Skopje", value: "Skopje" },
  { label: "Belgrade", value: "Belgrade" },
];

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>("");

    return (
      <ComboBox
        {...args}
        options={options}
        filterValue={filterValue}
        onChangeFilterValue={setFilterValue}
        value={value}
        onChange={(e) => {
          setValue(e.value);
        }}
      />
    );
  },
};

export const SmartPositioning: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>("");

    return (
      <ComboBox
        {...args}
        options={options}
        value={value}
        filterValue={filterValue}
        onChangeFilterValue={setFilterValue}
        onChange={(e) => {
          setValue(e.value);
        }}
      />
    );
  },
  decorators: [
    (Story) => (
      <div>
        <div
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            margin: "3em",
          }}
        >
          <Story />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            gap: "1rem",
            margin: "3em",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
