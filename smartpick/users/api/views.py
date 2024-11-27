from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin

from smartpick.users.models import User
from .serializers import UserSerializer

import logging

logger = logging.getLogger(__name__)


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
