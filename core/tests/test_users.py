import json

from model_bakery import baker
from rest_framework import status
from rest_framework.reverse import reverse

from ..models import User


class TestUsers:
    endpoint_list = "users-list"
    endpoint_detail = "users-detail"

    def test_create(self, db, client):
        data = {"email": "jorge@gmail.com", "password": "jorge"}

        response = client.post(
            reverse(self.endpoint_list),
            data=json.dumps(data),
            content_type="application/json",
        )
        response_data = response.json()

        assert response.status_code == status.HTTP_201_CREATED
        assert response_data["email"] == data["email"]

    def test_create_duplicate(self, db, client):
        data = {"email": "robson@gmail.com", "password": "jorge"}

        User.objects.create_user(**data, username=data["email"])

        response = client.post(
            reverse(self.endpoint_list),
            data=json.dumps(data),
            content_type="application/json",
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_update(self, db, client, create_token, user_jorge):
        token = create_token(user_jorge)
        data = {"email": "jorge@gmail.com"}

        response = client.patch(
            reverse(self.endpoint_detail, kwargs={"pk": 1}),
            data=json.dumps(data),
            HTTP_AUTHORIZATION=token,
            content_type="application/json",
        )
        response_data = response.json()

        assert response.status_code == status.HTTP_200_OK
        assert response_data["email"] == data["email"]

    def test_update_other_user(self, db, client, create_token, user_jorge):
        baker.make("core.User", pk=2, email="marcio@marcio.com")
        token_jorge = create_token(user_jorge)
        data = {"email": "marcio@gmail.com"}

        response = client.patch(
            reverse(self.endpoint_detail, kwargs={"pk": 2}),
            data=json.dumps(data),
            HTTP_AUTHORIZATION=token_jorge,
            content_type="application/json",
        )

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete(self, db, client, create_token, user_jorge):
        token = create_token(user_jorge)

        response = client.delete(
            reverse(self.endpoint_detail, kwargs={"pk": 1}), HTTP_AUTHORIZATION=token
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_delete_other_user(self, db, client, create_token, user_jorge):
        baker.make("core.User", pk=2, email="marcio@marcio.com")

        token = create_token(user_jorge)

        response = client.delete(
            reverse(self.endpoint_detail, kwargs={"pk": 2}), HTTP_AUTHORIZATION=token
        )

        assert response.status_code == status.HTTP_404_NOT_FOUND
