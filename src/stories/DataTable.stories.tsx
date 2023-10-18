import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

import DataTable from "@components/DataTable";
import { useState } from "react";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />

          <Canvas of={Dynamic} />
          <Controls of={Dynamic} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

const dynamicHeaders = [
  { key: "name", header: "Name", isSortable: true },
  { key: "lastname", header: "LastName", isSortable: true },
  { key: "email", header: "Email", isSortable: true },
  { key: "age", header: "Age" },
];
const dynamicRows = [
  {
    name: "Hristijan",
    lastname: "Veleski",
    email: "hristijan.veleski@gmail.com",
    age: 19,
  },
  { name: "Anna", lastname: "Nicole", email: "anna.nicole@gmail.com", age: 18 },
  {
    name: "Igor",
    lastname: "Stefanoski",
    email: "igor.stefanoski@gmail.com ",
    age: 180,
  },
  { name: "Santa", lastname: "Claus", email: "santa.claus@gmail.com", age: 28 },
  {
    name: "Mike",
    lastname: "Green",
    email: "mike.green@gmail.com",
    age: 8,
    _contextMenu: [
      {
        label: "Action1",
        action: () => {
          console.log("Action1");
        },
      },
    ],
  },
];

const basicHeaders = [
  { key: "name", header: "Name" },
  { key: "lastname", header: "LastName" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age" },
];
const basicRows = [
  {
    name: "Hristijan",
    lastname: "Veleski",
    email: "hristijan.veleski@gmail.com",
    age: 19,
  },
  { name: "Anna", lastname: "Nicole", email: "anna.nicole@gmail.com", age: 18 },
  {
    name: "Igor",
    lastname: "Stefanoski",
    email: "igor.stefanoski@gmail.com ",
    age: 180,
  },
  { name: "Santa", lastname: "Claus", email: "santa.claus@gmail.com", age: 28 },
  {
    name: "Mike",
    lastname: "Green",
    email: "mike.green@gmail.com",
    age: 8,
  },
];

const sortableHeaders = [
  { key: "name", header: "Name", isSortable: true },
  { key: "lastname", header: "LastName", isSortable: true },
  { key: "email", header: "Email", isSortable: true },
  { key: "age", header: "Age", isSortable: true },
];

const contextMenuRows = [
  {
    name: "Hristijan",
    lastname: "Veleski",
    email: "hristijan.veleski@gmail.com",
    age: 19,
    _contextMenu: [
      {
        label: "Action1",
        action: () => {
          console.log("Action1");
        },
      },
    ],
  },
  {
    name: "Anna",
    lastname: "Nicole",
    email: "anna.nicole@gmail.com",
    age: 18,
    _contextMenu: [
      {
        label: "Action2",
        action: () => {
          console.log("Action2");
        },
      },
    ],
  },
  {
    name: "Igor",
    lastname: "Stefanoski",
    email: "igor.stefanoski@gmail.com",
    age: 50,
    _contextMenu: [
      {
        label: "Action3",
        action: () => {
          console.log("Action3");
        },
      },
    ],
  },
  {
    name: "Santa",
    lastname: "Claus",
    email: "santa.claus@gmail.com",
    age: 28,
    _contextMenu: [
      {
        label: "Action4",
        action: () => {
          console.log("Action4");
        },
      },
    ],
  },
  {
    name: "Mike",
    lastname: "Green",
    email: "mike.green@gmail.com",
    age: 8,
    _contextMenu: [
      {
        label: "Action5",
        action: () => {
          console.log("Action5");
        },
      },
    ],
  },
];

export const Basic: Story = {
  render: (args) => {
    return <DataTable {...args} />;
  },
  args: {
    title: "Data table",
    description: "Table description",
    rows: basicRows,
    headers: basicHeaders,
    zebraStyles: true,
  },
};

export const Sortable: Story = {
  render: (args) => {
    return <DataTable {...args} />;
  },
  args: {
    title: "Data table",
    description: "Table description",
    rows: basicRows,
    headers: sortableHeaders,
    zebraStyles: true,
  },
};

export const ContextMenu: Story = {
  render: (args) => {
    return <DataTable {...args} />;
  },
  args: {
    title: "Data table",
    description: "Table description",
    rows: contextMenuRows,
    headers: basicHeaders,
    zebraStyles: true,
  },
};

export const Selection: Story = {
  render: (args) => {
    const [selection, setSelection] = useState<(typeof dynamicRows)[0] | null>(
      null
    );
    return (
      <DataTable
        selectionMode
        selection={selection as any}
        setSelection={setSelection as any}
        {...args}
      />
    );
  },
  args: {
    title: "Data table",
    description: "Table description",
    rows: basicRows,
    headers: basicHeaders,
    zebraStyles: true,
  },
};

export const Dynamic: Story = {
  render: (args) => {
    const [selection, setSelection] = useState<(typeof dynamicRows)[0] | null>(
      null
    );

    return (
      <DataTable
        {...args}
        title="Random table"
        description="haha description"
        selectionMode
        selection={selection as any}
        setSelection={setSelection as any}
        headers={dynamicHeaders}
        rows={dynamicRows}
        zebraStyles
      />
    );
  },
  args: {
    title: "Data table",
    description: "Table description",
    selectionMode: true,
    rows: dynamicRows,
    headers: dynamicHeaders,
    zebraStyles: true,
  },
};
