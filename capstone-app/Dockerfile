FROM ubuntu:latest
LABEL authors="Taylo"
WORKDIR /app

# 3. Copy files from your local computer into the container
COPY capstone-0.0.1-SNAPSHOT.jar .
RUN pip install --no-cache-dir -r requirements.txt || true
ENTRYPOINT ["top", "-b"]