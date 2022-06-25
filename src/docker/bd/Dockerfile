FROM postgres:14.1-alpine
ENV POSTGRES_PASSWORD=jest
ENV POSTGRES_USER=jest
ENV POSTGRES_DB=consulta_credito
COPY scripts/* /docker-entrypoint-initdb.d/
