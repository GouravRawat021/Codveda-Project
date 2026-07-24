"""
ui_tags.py — Custom Template Tags for the UI Library
"""

from django import template

register = template.Library()


@register.inclusion_tag('ui/button.html')
def ui_button(label="Button", variant="primary", size="md",
              button_type="button", disabled=False, aria_label="",
              extra_classes=""):
    """
    Renders the Button component.

    Usage in templates:
        {% load ui_tags %}
        {% ui_button label="Submit" variant="primary" size="lg" %}
        {% ui_button label="Cancel" variant="outline" %}
        {% ui_button label="" aria_label="Close" %}  {# icon-only #}
    """
    return {
        'label': label,
        'variant': variant,
        'size': size,
        'type': button_type,
        'disabled': disabled,
        'aria_label': aria_label,
        'extra_classes': extra_classes,
    }


@register.inclusion_tag('ui/card.html')
def ui_card(title="Card Title", description="", icon="",
            link_url="", link_text="Learn More", card_id="card"):
    """
    Renders the Card component.

    Usage in templates:
        {% load ui_tags %}
        {% ui_card title="Courses" description="Browse all." icon="📚" %}
        {% ui_card title="Projects" link_url="/projects/" card_id="projects-card" %}
    """
    return {
        'title': title,
        'description': description,
        'icon': icon,
        'link_url': link_url,
        'link_text': link_text,
        'card_id': card_id,
    }
