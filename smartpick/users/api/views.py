from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin

from smartpick.models import Category, Product
from smartpick.users.models import User
from .serializers import UserSerializer

import logging

logger = logging.getLogger(__name__)
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def clear_history(self, request):
        """
        Очищает историю аналитики текущего пользователя.
        """
        logger.info(f"Clear history requested by user: {request.user}")
        user = request.user
        user.analytics_history = []  # Очищаем историю
        user.save()
        return Response(
            {"message": "История просмотров успешно очищена."},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def add_favorite_product(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response(
                {"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            product = Product.objects.get(id=product_id)
            request.user.favorite_products.add(product)
            return Response(
                {"message": "Product added to favorites"}, status=status.HTTP_200_OK
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def add_favorite_category(self, request):
        category_id = request.data.get("category_id")
        if not category_id:
            return Response(
                {"error": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            category = Category.objects.get(id=category_id)
            request.user.favorite_categories.add(category)
            return Response(
                {"message": "Category added to favorites"}, status=status.HTTP_200_OK
            )
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def toggle_favorite_product(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response(
                {"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(id=product_id)
            user = request.user

            if product in user.favorite_products.all():
                user.favorite_products.remove(product)
                return Response(
                    {"message": "Product removed from favorites", "is_favorite": False},
                    status=status.HTTP_200_OK,
                )
            else:
                user.favorite_products.add(product)
                return Response(
                    {"message": "Product added to favorites", "is_favorite": True},
                    status=status.HTTP_200_OK,
                )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def toggle_favorite_category(self, request):
        category_id = request.data.get("category_id")
        if not category_id:
            return Response(
                {"error": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            category = Category.objects.get(id=category_id)
            user = request.user

            if category in user.favorite_categories.all():
                user.favorite_categories.remove(category)
                return Response(
                    {
                        "message": "Category removed from favorites",
                        "is_favorite": False,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                user.favorite_categories.add(category)
                return Response(
                    {"message": "Category added to favorites", "is_favorite": True},
                    status=status.HTTP_200_OK,
                )
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def is_favorite(self, request):
        product_id = request.query_params.get("product_id")
        category_id = request.query_params.get("category_id")

        if product_id:
            is_favorite = request.user.favorite_products.filter(id=product_id).exists()
            return Response({"is_favorite": is_favorite}, status=status.HTTP_200_OK)

        if category_id:
            is_favorite = request.user.favorite_categories.filter(
                id=category_id
            ).exists()
            return Response({"is_favorite": is_favorite}, status=status.HTTP_200_OK)

        return Response(
            {"error": "Product ID or Category ID is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )
