from django.shortcuts import render

def Landing(request):
    return render(request, "website/Landing.html")
