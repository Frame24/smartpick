FROM docker.io/traefik:2.10

# Создаем необходимые директории и устанавливаем права доступа для хранения ACME (если нужно)
RUN mkdir -p /etc/traefik/acme \
  && touch /etc/traefik/acme/acme.json \
  && chmod 600 /etc/traefik/acme/acme.json

# Копируем конфигурационный файл Traefik
COPY ./compose/production/traefik/traefik.yml /etc/traefik/traefik.yml

# Копируем SSL-сертификаты в соответствующую директорию
COPY ./compose/production/traefik/certs/ /etc/traefik/certs/