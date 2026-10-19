# ==========================================
# Stage 1: Build Angular Frontend
# ==========================================
FROM node:18-alpine AS frontend-build
WORKDIR /app/ui
COPY src/main/UI/package*.json ./
RUN npm ci
COPY src/main/UI/ ./
RUN npm run build

# ==========================================
# Stage 2: Build Spring Boot Application
# ==========================================
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
COPY --from=frontend-build /app/resources/static ./src/main/resources/static
RUN mvn clean package -DskipTests

# ==========================================
# Stage 3: Runtime Execution Container
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN mkdir -p /app/db
COPY --from=backend-build /app/target/capstone-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
VOLUME /app/db

ENTRYPOINT ["java", "-Dspring.datasource.url=jdbc:sqlite:/app/db/my_db.db", "-jar", "app.jar"]
