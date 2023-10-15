import type { Meta, StoryObj } from "@storybook/react";
import PasswordInput from "@components/PasswordInput/PasswordInput";
declare const meta: Meta<typeof PasswordInput>;
export default meta;
type Story = StoryObj<typeof PasswordInput>;
export declare const Basic: Story;
export declare const Disabled: Story;
export declare const Invalid: Story;
export declare const Light: Story;
