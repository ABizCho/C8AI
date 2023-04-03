# from django.urls import path
# from .views import *

# urlpatterns = [
#     path('aitools/', views.create_aitools, name='create_aitools'),
#     path('aitools/<int:pk>/', views.get_aitools, name='get_aitools'),
#     path('aitools/all/', views.getall_aitools, name='getall_aitools'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    # path('/', ),
    path('aitools/', views.create_aiTool, name='create_aiTool'),
    path('aitools/<int:pk>/', views.get_aiTool, name='get_aiTool'),
    path('aitools/all/', views.getall_aiTool, name='getall_aiTool'),
]