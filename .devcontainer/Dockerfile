FROM mcr.microsoft.com/vscode/devcontainers/python:3
ENV PYTHONUNBUFFERED=1
# Update args in docker-compose.yaml to set the UID/GID of the "vscode" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID vscode && usermod --uid $USER_UID --gid $USER_GID vscode; fi
# Install npm
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get -y install --no-install-recommends python3 python3-pip npm
