from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render

import markdown
import os

import asyncio
import websockets
import json
from datetime import datetime, timezone

from threading import Thread


def Index(request):
    return render(request, 'applications/analytics/analytics.html', {})


def MacroEconomic(request):
    markdown_file = os.path.join('./templates/applications/analytics/MacroEconomic.md')
    with open(markdown_file, 'r') as file:
        markdown_text = file.read()
    content = markdown.markdown(markdown_text)
    return render(request, 'applications/analytics/MacroEconomic.html', {
        'content':content
        })


def QuantitativeAnalytics(request):
    markdown_file = os.path.join('./templates/applications/analytics/QuantitativeAnalytics.md')
    with open(markdown_file, 'r') as file:
        markdown_text = file.read()
    content = markdown.markdown(markdown_text)
    return render(request, 'applications/analytics/QuantitativeAnalytics.html', {
        'content':content
        })


def MarineTraffic(request):
    markdown_file = os.path.join('./templates/applications/analytics/MarineTraffic.md')
    with open(markdown_file, 'r') as file:
        markdown_text = file.read()
    content = markdown.markdown(markdown_text)
    return render(request, 'applications/analytics/MarineTraffic.html', {
        'content':content
        })

async def connect_ais_stream(callback):
    '''AIS Stream API | https://aisstream.io/'''
    async with websockets.connect("wss://stream.aisstream.io/v0/stream") as websocket:
        subscribe_message = {"APIKey": settings.AIS_STREAM, "BoundingBoxes": [[[49.674, -10.854], [59.359, 1.779]]]}

        subscribe_message_json = json.dumps(subscribe_message)
        await websocket.send(subscribe_message_json)

        async for message_json in websocket:
            message = json.loads(message_json)
            message_type = message["MessageType"]

            if message_type == "PositionReport":
                ais_message = message['Message']['PositionReport']
                await callback(ais_message)

if __name__ == "__main__":
    asyncio.run(asyncio.run(connect_ais_stream()))

# In-memory data store
ais_data = []

# Callback function to handle AIS messages
async def ais_callback(ais_message):
    ais_data.append({
        'timestamp': str(datetime.now(timezone.utc)),
        'ship_id': ais_message['UserID'],
        'latitude': ais_message['Latitude'],
        'longitude': ais_message['Longitude'],
    })

    # Sleep if 100 ship IDs have been collected
    if len(ais_data) >= 2233:
        await asyncio.sleep(delay= 60*10)

# Start the WebSocket connection in a separate thread
def start_ais_stream():
    t = Thread(target=lambda: asyncio.run(connect_ais_stream(ais_callback)))
    t.daemon = True
    t.start()

start_ais_stream()

# Django view to access AIS data
def get_ais_data(request):
    return JsonResponse(ais_data, safe=False)

