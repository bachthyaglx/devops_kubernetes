FROM alpine:latest

RUN apk add --no-cache curl

COPY generate-todo.sh /app/generate-todo.sh
RUN chmod +x /app/generate-todo.sh

CMD ["/app/generate-todo.sh"]
