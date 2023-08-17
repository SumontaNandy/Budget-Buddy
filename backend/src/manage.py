import os

from flask_script import Manager
from flask_migrate import MigrateCommand

from __init__ import create_app
from api1 import blueprint as bp

app = create_app(os.getenv("CONFIG_MODE"))

app.register_blueprint(bp)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


def run():
    app.run()


def test():
    pass


@app.route('/')
def hello():    
    return 'Hello world'


if __name__ == "__main__":
    manager.run()