import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "@components/TextInput/TextInput";
import Tooltip from "@/components/Tooltip/Tooltip";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { Canvas, Controls, Story, Subtitle, Title } from "@storybook/blocks";

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
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
        },
    },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    render: (args) => (
        <>
            <Tooltip {...args}>
                <TextInput placeholder={args.position} />
            </Tooltip>
        </>
    ),
    args: { text: "Hi", position: "right", isShown: true },
    argTypes: { isShown: { control: 'boolean' } }
};

export const IsShownTooltip: Story = {
    render: toggleTooltip,
};

function toggleTooltip() {
    const [toggleTooltip, setToggleTooltip] = useState(false);

    return (
        <>
            <Button
                label="Toggle Tooltip"
                onClick={() => setToggleTooltip((prevState) => !prevState)}
            />

            <Tooltip
                text="Hi"
                position="right"
                style={{ display: "inline-block" }}
                isShown={toggleTooltip}
            >
                <TextInput placeholder="right" />
            </Tooltip>
        </>
    );
}
