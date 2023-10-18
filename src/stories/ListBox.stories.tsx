import type { Meta, StoryObj } from "@storybook/react";

import ListBox from "@components/ListBox";
import { useState } from "react";
import { LabelValue } from "@/type-utils/listbox";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const SingleSelect: Story = {
  render: (args) => {
    const options: LabelValue[] = [
      { label: "Berlin", value: "Berlin" },
      { label: "Frankfurt", value: "Frankfurt" },
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
      { label: "Skopje", value: "Skopje" },
      { label: "Belgrade", value: "Belgrade" },
    ];

    const [value, setValue] = useState<string | null>("Berlin");

    return (
      <>
        <h1>{value}</h1>
        <ListBox
          {...args}
          options={options}
          value={value}
          onChange={(e) => {
            setValue(e.value);
          }}
        />
      </>
    );
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    const options: LabelValue[] = [
      { label: "Berlin", value: "Berlin" },
      { label: "Frankfurt", value: "Frankfurt" },
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
      { label: "Skopje", value: "Skopje" },
      { label: "Belgrade", value: "Belgrade" },
    ];

    const [value, setValue] = useState<string[] | null>(["Berlin"]);

    return (
      <>
        <h1>{value?.join(",")}</h1>
        <ListBox
          {...(args as any)}
          options={options}
          value={value}
          multiple
          onChange={(e) => {
            setValue(e.value);
          }}
        />
      </>
    );
  },
};

export const TemplateListBox: Story = {
  render: (args) => {
    const options: LabelValue[] = [
      { label: "Berlin", value: "Berlin" },
      { label: "Frankfurt", value: "Frankfurt" },
      { label: "Hamburg", value: "Hamburg" },
      { label: "Munich", value: "Munich" },
      { label: "Skopje", value: "Skopje" },
      { label: "Belgrade", value: "Belgrade" },
    ];

    const [value, setValue] = useState<string | null>(options[0].value);

    function getItemTemplate(option: LabelValue): JSX.Element {
      return (
        <>
          {option.value}
          <br />
          <span className="text-secondary text-sm">
            ({option.value}; {"ID"} {option.label})
          </span>
        </>
      );
    }

    return (
      <>
        <h1>{value}</h1>
        <ListBox
          {...(args as any)}
          options={options}
          value={value}
          onChange={(e) => {
            setValue(e.value);
          }}
          itemTemplate={getItemTemplate}
        />
      </>
    );
  },
};
