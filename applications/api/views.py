from django.shortcuts import render
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response


class Docs(APIView):
    '''My Technology Stack'''
    def get(self, request):
        self.data = pd.read_excel(f'./static/database/Tech_Stack.xlsx').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))


class Industry(APIView):
    '''Product API | Technology: Software Application: Artificial Intelligence.'''
    def get(self, request):
        self.data = pd.read_excel(f'./static/database/Ai_Industry.xlsx').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))


class Securities01(APIView):
    '''Securities Models API'''
    def get(self, request):
        self.data = pd.read_excel('./static/database/Securities.xlsx').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))

class Securities02(APIView):
    '''Securities Models API'''
    def get(self, request):
        self.data = pd.read_excel('./static/database/Securities.xlsx', sheet_name='Commodities').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))

class Securities03(APIView):
    '''Securities Models API'''
    def get(self, request):
        self.data = pd.read_excel('./static/database/Securities.xlsx', sheet_name='FX & Bonds').fillna(value='null')
        return Response(self.data.to_dict(orient='records'))
