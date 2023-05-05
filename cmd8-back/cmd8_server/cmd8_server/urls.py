from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from django.http import HttpResponse, JsonResponse # for test



urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/', include('core.urls')),

]

urlpatterns += [path('silk/', include('silk.urls', namespace='silk'))]
