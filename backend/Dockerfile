FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
