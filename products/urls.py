from rest_framework.routers import DefaultRouter

from products import views

router = DefaultRouter()
router.register(r"", views.ProductViewSet, basename="products")

urlpatterns = router.urls
