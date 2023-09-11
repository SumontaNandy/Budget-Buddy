#!/bin/bash

set -o errexit

# python3 src/manage.py db migrate
# python3 src/manage.py db upgrade 
python3 src/manage.py runserver --host=0.0.0.0 --port=5000

exec "$@"