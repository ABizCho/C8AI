from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from django.http import HttpResponse, JsonResponse # for test



urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls'), name='accounts'),
    path('core/', include('core.urls'), name='core'),
    

]

urlpatterns += [path('silk/', include('silk.urls'))]
