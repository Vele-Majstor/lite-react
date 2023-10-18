import type { Meta, StoryObj } from "@storybook/react";
import { Canvas, Controls, Subtitle, Title } from "@storybook/blocks";

import Toast from "@components/Toast";
import Button from "@components/Button";
import { useRef } from "react";
import { ToastFunctions } from "@/components/Toast/Toast.types";

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />

          <Canvas of={Default} />
          <Controls of={Default} />
        </>
      ),
      source: { type: "code" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: (args) => {
    const toastRef = useRef<HTMLDivElement & ToastFunctions>(null);

    function showSuccess() {
      toastRef.current?.show({
        severity: "success",
        summary: "Success Message",
        detail: "Order submitted",
      });
    }
    function showDanger() {
      toastRef.current?.show({
        severity: "danger",
        summary: "Danger Message",
        detail: "Order submitted dangerously",
      });
    }

    function showWarning() {
      toastRef.current?.show({
        severity: "warn",
        summary: "Warning Message",
        detail: "Be careful",
      });
    }

    function showInfo() {
      toastRef.current?.show({
        severity: "info",
        summary: "Info Message",
        detail: "Important information",
      });
    }

    return (
      <>
        <div style={{ height: "50vh", display: "flex" }}>
          <Button label="Success" onClick={showSuccess} />
          <Button label="Danger" onClick={showDanger} />
          <Button label="Warning" onClick={showWarning} />
          <Button label="Info" onClick={showInfo} />
          <Toast {...args} ref={toastRef} />
        </div>
      </>
    );
  },
  args: { position: "bottom-right" },
};
