import os
from werkzeug.utils import secure_filename
from werkzeug.exceptions import NotFound


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


def upload_file(file, filename):
    if file.filename == '':
        raise NotFound('No selected file')
    if file and allowed_file(file.filename):
        filename = secure_filename(filename)

        from manage import app
        filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        if os.path.isfile(filename):
            os.remove(filename)

        file.save(filename)

    return filename
    