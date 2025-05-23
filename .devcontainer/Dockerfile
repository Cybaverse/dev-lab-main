FROM mcr.microsoft.com/vscode/devcontainers/python:3
ENV PYTHONUNBUFFERED=1
# Update args in docker-compose.yaml to set the UID/GID of the "vscode" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID vscode && usermod --uid $USER_UID --gid $USER_GID vscode; fi
# Install npm
RUN apt-get update && apt-get -y install --no-install-recommends npm
# Transfer requirements file
COPY backend/requirements.txt requirements.txt
# Building python venv
RUN python3 -m venv ./venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
# Installing requirements
RUN pip install wheel && pip install -r requirements.txt
# Install web
WORKDIR /workspace/web
COPY web/package.json ./
COPY web/package-lock.json ./
RUN npm install