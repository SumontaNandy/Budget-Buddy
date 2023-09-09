FROM python:3.11.4-slim-buster

RUN pip install --upgrade pip

WORKDIR /app

COPY . /app

RUN pip3 --no-cache-dir install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "src/manage.py", "runserver", "--host=0.0.0.0", "--port=5000"]