from django import template

register = template.Library()

@register.filter
def unique(sequence):
    """Фильтр, который удаляет дублирующиеся элементы в последовательности."""
    seen = set()
    return [x for x in sequence if not (x in seen or seen.add(x))]
