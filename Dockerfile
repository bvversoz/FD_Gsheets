FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl git unzip xz-utils zip libglu1-mesa

# Download the Flutter SDK
RUN curl -sSL https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_2.10.1-stable.tar.xz | tar -xJ -C /usr/local/bin

# Add Flutter to PATH environment variable
ENV PATH=$PATH:/usr/local/bin/flutter/bin

# Install dependencies
RUN flutter pub get

# Build the Flutter app
RUN flutter build web

# Set up the web server to serve the built app
CMD ["python3", "-m", "http.server", "8000"]
