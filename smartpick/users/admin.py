from allauth.account.decorators import secure_admin_login
from django.conf import settings
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.utils.translation import gettext_lazy as _
from django import forms
from django_json_widget.widgets import JSONEditorWidget

from .forms import UserAdminChangeForm, UserAdminCreationForm
from .models import User

if settings.DJANGO_ADMIN_FORCE_ALLAUTH:
    # Force the `admin` sign-in process to go through the `django-allauth` workflow:
    # https://docs.allauth.org/en/latest/common/admin.html#admin
    admin.autodiscover()
    admin.site.login = secure_admin_login(admin.site.login)  # type: ignore[method-assign]


# Кастомная форма для редактирования пользователя
class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"
        widgets = {
            "analytics_history": JSONEditorWidget(),  # Используем виджет JSONEditorWidget
        }


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserAdminCreationForm

    # Поля, отображаемые в админке для редактирования
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("name", "favorite_categories", "favorite_products", "analytics_history")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    # Отображение в списке пользователей
    list_display = ["email", "name", "is_superuser", "is_active", "is_staff"]
    search_fields = ["email", "name"]
    ordering = ["id"]

    # Поля для добавления нового пользователя
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
