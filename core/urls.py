from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import CustomObtainAuthToken, UserViewset

router = DefaultRouter()
router.register(r"users", UserViewset, basename="users")

urlpatterns = [
    path(r"login/", CustomObtainAuthToken.as_view()),
    path("", include(router.urls)),
]
