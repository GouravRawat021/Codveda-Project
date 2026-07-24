/**
 * Card.stories.js — Storybook Definitions
 */

import { renderTemplate } from 'storybook-django';

export default {
  title: 'UI Components/Card',
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    link_url: { control: 'text' },
    link_text: { control: 'text' },
  },
  args: {
    title: 'Default Card',
  },
};

const Template = (args) => {
  return renderTemplate(`
    {% load ui_tags %}
    <div style="max-width: 400px; padding: 2rem; background: #f9fafb;">
      {% ui_card title=title description=description icon=icon link_url=link_url link_text=link_text %}
    </div>
  `, args);
};

export const Basic = Template.bind({});
Basic.args = {
  title: 'Simple Card',
  description: 'A basic card with just a title and description text.',
};

export const WithIconAndLink = Template.bind({});
WithIconAndLink.args = {
  title: 'Course Module',
  description: 'Learn the fundamentals of web development.',
  icon: '🎓',
  link_url: '#',
  link_text: 'Start Module',
};
