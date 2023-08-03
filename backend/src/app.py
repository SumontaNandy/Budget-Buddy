import os

# App Initialization
from . import create_app
app = create_app(os.getenv("CONFIG_MODE"))

from .api1 import blueprint as api1
app.register_blueprint(api1)

@app.route('/')
def hello():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()