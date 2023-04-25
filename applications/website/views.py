from django.shortcuts import render

import os
import markdown

def Landing(request):
    return render(request, "website/Landing.html")


def Securities(request):
    markdown_file = os.path.join('./templates/website/Securities.md')
    with open(markdown_file, 'r') as file:
        markdown_text = file.read()
    content = markdown.markdown(markdown_text)
    return render(request, "website/Securities.html", {'content': content})
