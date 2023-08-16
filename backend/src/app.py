import os

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from __init__ import create_app
from api1 import blueprint as bp

app = create_app(os.getenv("CONFIG_MODE"))
app.app_context().push()

db = SQLAlchemy(app=app)
migrate = Migrate(app=app, db=db)
jwt = JWTManager(app=app)

app.register_blueprint(bp)


def run():
    app.run()


def test():
    pass


@app.route('/')
def hello():    
    return 'Hello world'


if __name__ == "__main__":
    run()