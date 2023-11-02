import pytest
from model_bakery import baker
from rest_framework.authtoken.models import Token


@pytest.fixture
def create_token():
    def wrapper(user):
        token = Token.objects.create(user=user).key
        return f"Token {token}"

    return wrapper


@pytest.fixture
def user_jorge():
    return baker.make(
        "core.User",
        pk=1,
        email="jorge@gmail.com",
        username="jorge",
        password="jorge123",
    )
