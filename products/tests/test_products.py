from model_bakery import baker
from rest_framework import status
from rest_framework.reverse import reverse

from ..models import Product


class TestProducts:
    list = reverse("products-list")

    def get_detail_route(self, pk):
        return reverse("products-detail", kwargs={"pk": pk})

    def test_list(self, db, client):
        product = baker.make(Product)

        response = client.get(self.list)
        returned_product = response.json()["results"][0]

        assert returned_product["id"] == product.pk
        assert returned_product["name"] == product.name
        assert returned_product["price"] == "{:.2f}".format(product.price)

    def test_detail(self, db, client):
        product = baker.make(Product)
        response = client.get(self.get_detail_route(product.pk))

        assert response.status_code == status.HTTP_200_OK

        returned_product = response.json()

        assert returned_product["id"] == product.pk
        assert returned_product["name"] == product.name
        assert returned_product["price"] == str(product.price)

    def test_create(self, db, client, user_jorge, create_token):
        token = create_token(user_jorge)
        data = {
            "name": "Chuteira Nike",
            "price": 49900,
        }

        response = client.post(self.list, data=data, HTTP_AUTHORIZATION=token)

        assert response.status_code == status.HTTP_201_CREATED

        returned_data = response.json()

        assert returned_data["name"] == data["name"]
        assert returned_data["price"] == "{:.2f}".format(data["price"])
        assert returned_data["owner"]["email"] == user_jorge.email

    def test_create_duplicate(self, db, client, user_jorge, create_token):
        token = create_token(user_jorge)
        product = baker.make(
            Product, name="Tapete coletor de areia para Gatos", price=6900
        )

        data = {"name": product.name, "price": product.price}

        response = client.post(self.list, data=data, HTTP_AUTHORIZATION=token)

        assert response.status_code == status.HTTP_400_BAD_REQUEST

        print(response.data)

    def test_create_long_name(self, db, client, user_jorge, create_token):
        token = create_token(user_jorge)
        data = {"name": "A" * 256, "price": 199}

        response = client.post(self.list, data=data, HTTP_AUTHORIZATION=token)

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_create_exceeds_price(self, db, client, user_jorge, create_token):
        token = create_token(user_jorge)
        data = {"name": "Planet Jupiter", "price": 1e12}

        response = client.post(self.list, data=data, HTTP_AUTHORIZATION=token)

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_update(self, db, user_jorge, client, create_token):
        token = create_token(user_jorge)
        product = baker.make(Product, owner=user_jorge, name="Python Fluente")

        data = {"name": "Python para Zumbis"}

        response = client.patch(
            self.get_detail_route(product.pk),
            data=data,
            HTTP_AUTHORIZATION=token,
            content_type="application/json",
        )

        print(response.data)

        assert response.status_code == status.HTTP_200_OK

        received_data = response.json()

        assert received_data["name"] == data["name"]

    def test_update_not_owned(self, db, user_jorge, client, create_token):
        token = create_token(user_jorge)
        dummy_user = baker.make("core.User")
        product = baker.make(Product, owner=dummy_user, name="Python Fluente")

        data = {"name": "Python para Zumbis"}

        response = client.patch(
            self.get_detail_route(product.pk),
            data=data,
            HTTP_AUTHORIZATION=token,
            content_type="application/json",
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_delete(self, db, user_jorge, client, create_token):
        token = create_token(user_jorge)
        product = baker.make(Product, owner=user_jorge, name="Python Fluente")

        response = client.delete(
            self.get_detail_route(product.pk), HTTP_AUTHORIZATION=token
        )

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_delete_not_owned(self, db, user_jorge, client, create_token):
        token = create_token(user_jorge)
        dummy_user = baker.make("core.User")
        product = baker.make(Product, owner=dummy_user, name="Python Fluente")

        response = client.delete(
            self.get_detail_route(product.pk), HTTP_AUTHORIZATION=token
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN
