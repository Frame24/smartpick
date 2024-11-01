# ruff: noqa

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from django.views import defaults as default_views
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.authtoken.views import obtain_auth_token

# Создаем отдельные списки маршрутов для каждого сайта

# Маршруты для smart-pick
smartpick_patterns = [
    path("", include("smartpick.urls")),
    path("users/", include("smartpick.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
]

# Маршруты для asursoft
asursoft_patterns = [
    path("", include("asursoft.urls")),
    # дополнительные пути, если есть
]

# Общие маршруты, доступные для обоих доменов
common_patterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/", include("config.api_router")),
    path("api/auth-token/", obtain_auth_token),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Начальный пустой urlpatterns (будет динамически изменяться через middleware)
urlpatterns = common_patterns

# Добавляем отладочные маршруты, если DEBUG включен
if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
