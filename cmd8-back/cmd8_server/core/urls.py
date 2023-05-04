from django.urls import path
from . import views

urlpatterns = [
    # AiTool paths
    path('aitool/', views.create_aiTool, name='create_aiTool'),
    path('aitool/<int:pk>/', views.get_aiTool, name='get_aiTool'),
    path('aitool/all/', views.get_all_aiTools, name='get_all_aiTools'),

    # AiToolCategory paths
    path('aitool/category/', views.create_aiTool_category, name='create_aiTool_category'),
    
    path('aitool/category/<int:pk>/', views.get_aiTool_category, name='get_aiTool_category'),
    path('aitool/category/all/', views.get_all_aiTool_categories, name='get_all_aiTool_categories'),
    
]