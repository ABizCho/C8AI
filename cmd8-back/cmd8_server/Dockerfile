FROM python:3.8-slim-buster

WORKDIR /cmd8_server

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system packages required by Django and the database client
RUN apt-get update \
    && apt-get -y install gcc python3-dev musl-dev


COPY ./requirements.txt .
RUN pip install --upgrade pip

# psycopg설치 시, postgresq에 관한 의존성 libs 필요로 추가했음
RUN apt-get update && apt-get -y install gcc python3-dev musl-dev libpq-dev 
RUN pip install -r requirements.txt

COPY . .