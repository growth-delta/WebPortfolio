import os
from django.shortcuts import render
import markdown


def Content(request):

    markdown_file = os.path.join(os.path.dirname(__file__), 'cms', 'Content.md')
    with open(markdown_file, 'r') as file:
        markdown_text = file.read()
    content = markdown.markdown(markdown_text)

    return render(request, 'applications/content/Content.html', {'content': content})
