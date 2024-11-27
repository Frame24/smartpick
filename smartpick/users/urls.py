from django.urls import path

from smartpick.views.profile_view import profile_view
from .views import get_auth_token, user_detail_view, user_redirect_view, user_update_view

app_name = "users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<int:pk>/", view=user_detail_view, name="detail"),
    path("profile/", view=profile_view, name="profile"),  # Новый URL для профиля
    path("get-auth-token/", get_auth_token, name="get-auth-token"),
]
