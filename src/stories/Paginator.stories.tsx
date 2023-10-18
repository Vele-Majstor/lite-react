import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Title } from "@storybook/blocks";

import Paginator from "@components/Paginator";
import { useState } from "react";

const meta: Meta<typeof Paginator> = {
  component: Paginator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />

          <Canvas of={Default} />
          <Controls of={Default} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paginator>;

export const Default: Story = {
  render: (args) => {
    const [first, setFirst] = useState(0);
    const [paginatorRows, setPaginatorRows] = useState(10);

    const onPageChange = (event: any) => {
      setFirst(event.first);
      setPaginatorRows(event.rows);
    };
    return (
      <Paginator
        {...args}
        first={first}
        rows={paginatorRows}
        onPageChange={onPageChange}
      />
    );
  },
  args: {
    totalRecords: 120,
    rowsPerPageOptions: [10, 20, 30],
  },
};
