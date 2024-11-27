from typing import ClassVar

from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db.models import EmailField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.db import models

from .managers import UserManager


class User(AbstractUser):
    """
    Default custom user model for smartpick_project.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore[assignment]
    last_name = None  # type: ignore[assignment]
    email = EmailField(_("email address"), unique=True)
    username = None  # type: ignore[assignment]

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    # Дополнительные поля для ЛК
    favorite_categories = models.ManyToManyField(
        "smartpick.Category", blank=True, related_name="users", verbose_name="Избранные категории"
    )
    favorite_products = models.ManyToManyField(
        "smartpick.Product", blank=True, related_name="users", verbose_name="Избранные товары"
    )
    analytics_history = models.JSONField(
        verbose_name="История аналитики",
        null=True,
        blank=True,
        help_text="Хранит данные о просмотренных продуктах или категориях.",
    )

    objects: ClassVar[UserManager] = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})
