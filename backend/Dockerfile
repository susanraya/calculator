# Multi-stage build. This single container is the whole app host: it answers
# both the API and the frontend's origin requests (see the GET /{path:path}
# route in app/main.py), so the frontend's production bundle has to ship
# inside this image. Build context is the repository root, so this stage can
# reach frontend/ alongside backend/:
#   docker build -f backend/Dockerfile .
FROM node:20-slim AS frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app
# app/main.py's STATIC_DIR defaults to <this file's dir>/../static, i.e.
# /app/static given WORKDIR /app above -- matches where this lands.
COPY --from=frontend-build /frontend/dist ./static

# Run as an unprivileged user. The service never needs root, and a container that
# drops it limits what a compromise of the app can do to the host.
RUN useradd --create-home --uid 10001 appuser
USER appuser

EXPOSE 8000

# Reports the container unhealthy when the app stops answering. Uses the Python
# standard library rather than curl, which the slim base image does not ship.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=3)"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
