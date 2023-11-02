from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import User
from .permissions import IsOwnProfile
from .serializers import UserSerializer


class UserViewset(
    CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnProfile,)

    @action(methods=["get"], detail=False)
    def whoami(self, request):
        if not request.user.id:
            return Response()
        serializer = self.get_serializer(instance=request.user)
        return Response(serializer.data)

    def get_queryset(self):
        qs = super().get_queryset()

        if not self.request.user.id:
            return qs.none()

        return qs.filter(pk=self.request.user.id)
