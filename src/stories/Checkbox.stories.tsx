import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

import CheckBox from "@components/Checkbox";
import { useState } from "react";

const meta: Meta<typeof CheckBox> = {
    component: CheckBox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />

                    <Canvas of={Basic} />
                    <Controls of={Basic} />
                </>
            ),
            source: { type: "code" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Basic: Story = {
    render: (args) => {
        const [isChecked, setIsChecked] = useState(false);

        return (
            <CheckBox
                {...args}
                id="cbx"
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
            />
        );
    },
    args: { label: "Hello" }
};
