from rest_framework.permissions import BasePermission


class IsOwnProfile(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_authenticated)
