from django.contrib import sitemaps
from django.urls import reverse

# SiteMap
class SiteMap(sitemaps.Sitemap):
    """
    Sitemap. url 'website:Landing' this adds the URL to the sitemap
    """
    def items(self):
        return [
            # Website
            'website:Landing',
            # Content
            'content:Content',
            # API
            'api:Docs',
        ]
    def location(self, item):
        return reverse(item)
