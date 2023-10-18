import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Title } from "@storybook/blocks";

import Skeleton from "@components/Skeleton";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
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
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => {
    return <Skeleton {...args} />;
  },
  args: { width: "10rem", height: "5rem", borderRadius: "3px" },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <div>
          <h2>Rectangle</h2>
          <Skeleton style={{ marginBottom: ".5rem" }}></Skeleton>
          <Skeleton width="10rem" style={{ marginBottom: ".5rem" }}></Skeleton>
          <Skeleton width="5rem" style={{ marginBottom: ".5rem" }}></Skeleton>
          <Skeleton height="2rem" style={{ marginBottom: ".5rem" }}></Skeleton>
          <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
        <div>
          <h2>Rounded</h2>
          <Skeleton
            style={{ marginBottom: ".5rem" }}
            borderRadius="16px"
          ></Skeleton>
          <Skeleton
            width="10rem"
            style={{ marginBottom: ".5rem" }}
            borderRadius="16px"
          ></Skeleton>
          <Skeleton
            width="5rem"
            borderRadius="16px"
            style={{ marginBottom: ".5rem" }}
          ></Skeleton>
          <Skeleton
            height="2rem"
            style={{ marginBottom: ".5rem" }}
            borderRadius="16px"
          ></Skeleton>
          <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
        </div>
        <div>
          <h2>Square</h2>
          <div>
            <Skeleton size="2rem" style={{ marginBottom: ".5rem" }}></Skeleton>
            <Skeleton size="3rem" style={{ marginBottom: ".5rem" }}></Skeleton>
            <Skeleton size="4rem" style={{ marginBottom: ".5rem" }}></Skeleton>
            <Skeleton size="5rem"></Skeleton>
          </div>
        </div>
        <div>
          <h2>Circle</h2>
          <div>
            <Skeleton
              shape="circle"
              size="2rem"
              style={{ marginBottom: ".5rem" }}
            ></Skeleton>
            <Skeleton
              shape="circle"
              size="3rem"
              style={{ marginBottom: ".5rem" }}
            ></Skeleton>
            <Skeleton
              shape="circle"
              size="4rem"
              style={{ marginBottom: ".5rem" }}
            ></Skeleton>
            <Skeleton shape="circle" size="5rem"></Skeleton>
          </div>
        </div>
      </div>
    );
  },
};
