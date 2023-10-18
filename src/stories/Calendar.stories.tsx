import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Title } from "@storybook/blocks";

import DefaultCalendar, {
    MultiSelectCalendar,
    RangeCalendar,
} from "@components/Calendar";
import { useState } from "react";

const meta: Meta<typeof DefaultCalendar> = {
    component: DefaultCalendar,
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
type Story = StoryObj<typeof DefaultCalendar>;

const minDate: number | Date = new Date();
minDate.setDate(minDate.getDate() - 1);

export const Default: Story = {
    render: (args) => {
        if (typeof args.minDate === "number") {
            args.minDate = new Date(args.minDate);
        }
        if (typeof args.maxDate === "number") {
            args.maxDate = new Date(args.maxDate);
        }

        const [date, setDate] = useState<Date | null>(null);

        return (
            <DefaultCalendar
                {...(args as any)}
                value={date}
                onChange={(event) => setDate(event.value)}
            />
        );
    },
    args: { minDate },
};
export const MultiSelect: Story = {
    render: (args) => {
        const [date, setDate] = useState<Date[] | null>(null);

        return (
            <MultiSelectCalendar
                {...(args as any)}
                value={date}
                onChange={(event) => setDate(event.value)}
            />
        );
    },
    args: { minDate },
};
export const Range: Story = {
    render: (args) => {
        const [date, setDate] = useState<[Date | null, Date | null] | null>(null);

        return (
            <RangeCalendar
                {...(args as any)}
                value={date}
                onChange={(event) => setDate(event.value)}
            />
        );
    },
    args: { minDate },
};
