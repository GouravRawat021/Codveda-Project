
import { renderTemplate } from 'storybook-django';

export default {
  title: 'UI Components/Button',  // How it appears in the sidebar
  

  argTypes: {
    label: { control: 'text' },
    variant: { 
      control: 'select', 
      options: ['primary', 'outline', 'ghost'] 
    },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'] 
    },
    disabled: { control: 'boolean' },
  },
  
  // Default values for args
  args: {
    label: 'Click Me',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

const Template = (args) => {
  return renderTemplate(`
    {% load ui_tags %}
    {% ui_button label=label variant=variant size=size disabled=disabled %}
  `, args);
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};
