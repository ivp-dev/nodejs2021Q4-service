FROM postgres
COPY ./scripts/init-db.sh /docker-entrypoint-initdb.d/init-db.sh
CMD ["docker-entrypoint.sh", "postgres"]