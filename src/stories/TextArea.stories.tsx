import type { Meta, StoryObj } from "@storybook/react";

import TextArea from "@components/TextArea";

const meta: Meta<typeof TextArea> = {
    component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
    render: () => (
        <>
            <TextArea
                id="primary"
                label="Label for input"
                helperText="Helper text"
                placeholder="Placeholder text"
            />
        </>
    ),
};

export const Disabled: Story = {
    render: () => (
        <>
            <TextArea
                id="primary"
                label="Label for input"
                helperText="Helper text"
                placeholder="Placeholder text"
                disabled
            />
        </>
    ),
};

export const Invalid: Story = {
    render: () => (
        <>
            <TextArea
                id="primary"
                label="Label for input"
                helperText="Helper text"
                placeholder="Placeholder text"
                invalid
            />
        </>
    ),
};

export const Light: Story = {
    render: () => (
        <>
            <TextArea
                id="primary"
                label="Label for input"
                helperText="Helper text"
                placeholder="Placeholder text"
                light
            />
        </>
    ),
};

