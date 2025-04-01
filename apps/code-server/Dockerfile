FROM codercom/code-server:4.96.4

# Switch to root user to install dependencies
USER root

# Install curl, Node.js and dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the 'coder' user
USER coder

# Expose the necessary ports
EXPOSE 8080
EXPOSE 5173

# Run code-server and bind it to both 8080 and 5173 (if necessary)
CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "--host", "0.0.0.0", "--port", "5173", "/tmp/bolty-worker"]
