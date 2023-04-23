from django.shortcuts import render
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response


class Docs(APIView):
    '''Demonstration of API 01'''
    def get(self, request):
        self.data = pd.read_excel(f'./static/database/Tech_Stack.xlsx').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))


class Industry(APIView):
    '''Demonstration of API 01'''
    def get(self, request):
        self.data = pd.read_excel(f'./static/database/Ai_Industry.xlsx').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))

