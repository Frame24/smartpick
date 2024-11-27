from django.conf import settings
from django.dispatch import receiver
from allauth.account.signals import user_logged_in
from rest_framework.authtoken.models import Token

@receiver(user_logged_in)
def create_auth_token(sender, request, user, **kwargs):
    Token.objects.get_or_create(user=user)
