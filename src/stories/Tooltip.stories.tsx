import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "@components/TextInput/TextInput";
import Tooltip from "@/components/Tooltip/Tooltip";
import Button from "@/components/Button/Button";
import { useState } from "react";

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    render: () => (
        <>
            <Tooltip text="Hi" position="right">
                <TextInput placeholder="right" />
            </Tooltip>
        </>
    ),
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
