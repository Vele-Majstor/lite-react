import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

import Modal from "@components/Modal/Modal";
import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import { useState } from "react";
import { LabelValue } from "@/type-utils/listbox";

const meta: Meta<typeof Modal> = {
    component: Modal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />

                    <Canvas of={Controlled} />
                    <Controls of={Controlled} />
                </>
            ),
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const options: LabelValue[] = [
    { label: "Berlin", value: "Berlin" },
    { label: "Frankfurt", value: "Frankfurt" },
    { label: "Hamburg", value: "Hamburg" },
    { label: "Munich", value: "Munich" },
    { label: "Skopje", value: "Skopje" },
    { label: "Belgrade", value: "Belgrade" },
];

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState<string | null>(null);
        const [modalVisible, setModalVisible] = useState(false);

        function hideModal() {
            setModalVisible(false);
        }
        return (
            <>
                <Button label="Open modal" onClick={() => setModalVisible(true)} />
                <Modal
                    {...args}
                    visible={modalVisible}
                    onHide={hideModal}
                    header="Modal Header"
                    footer={
                        <>
                            <Button severity="secondary" label="Close" onClick={hideModal} />
                            <Button severity="primary" label="Submit" onClick={hideModal} />
                        </>
                    }
                >
                    <Dropdown
                        style={{ margin: "auto" }}
                        options={options}
                        value={value}
                        onChange={(e) => {
                            setValue(e.value);
                        }}
                        showClear
                    />
                </Modal>
            </>
        );
    },
    args: { title: "Modal Title" },
};
