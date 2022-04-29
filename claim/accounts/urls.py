from django.urls import include, path

from . import routers, views

urlpatterns = [
    path('data/', views.UserRetrieveUpdateDestroyAPIView.as_view(),
         name='user-data'),
    path('users/', include(routers.router.urls)), 
]