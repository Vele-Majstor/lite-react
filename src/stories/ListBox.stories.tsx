import type { Meta, StoryObj } from "@storybook/react";

import ListBox from "@components/ListBox";
import { useState } from "react";
import { LabelValue } from "@/type-utils/listbox";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
};

export default meta;
type Story = StoryObj<typeof ListBox>;

const options: LabelValue[] = [
  { label: "Berlin", value: "Berlin" },
  { label: "Frankfurt", value: "Frankfurt" },
  { label: "Hamburg", value: "Hamburg" },
  { label: "Munich", value: "Munich" },
  { label: "Skopje", value: "Skopje" },
  { label: "Belgrade", value: "Belgrade" },
];

export const SingleSelect: Story = {
  render: SingleSelectListBox,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

export const MultiSelect: Story = {
  render: MultiSelectListBox,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

export const TemplateListBox: Story = {
  render: ListBoxWithTemplate,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "1rem", margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};

function SingleSelectListBox() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <h1>{value}</h1>
      <ListBox
        options={options}
        value={value}
        onChange={(e) => {
          setValue(e.value);
        }}
      />
    </>
  );
}

function MultiSelectListBox() {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <>
      <h1>{value?.join(",")}</h1>
      <ListBox
        options={options}
        value={value}
        multiple
        onChange={(e) => {
          setValue(e.value);
        }}
      />
    </>
  );
}

function ListBoxWithTemplate() {
  const [value, setValue] = useState<string | null>(options[0].value);

  return (
    <>
      <h1>{value}</h1>
      <ListBox
        options={options}
        value={value}
        onChange={(e) => {
          setValue(e.value);
        }}
        itemTemplate={getItemTemplate}
      />
    </>
  );
}

function getItemTemplate(option: LabelValue): JSX.Element {
  return (
    <>
      {option.value}
      <br />
      <span className="p-text-secondary text-sm">
        ({option.value}; {"ID"} {option.label})
      </span>
    </>
  );
}
