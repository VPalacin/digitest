'''
Created on 19 sep. 2018

@author: julio
'''
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_list/', views.get_list, name='get_list'),
]