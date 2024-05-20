from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2
import urllib.request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Get the directory path where the Python script is located
script_dir = os.path.dirname(__file__)

# Load the trained model from the same directory
model_path = os.path.join(script_dir, 'modefied.h5')
model = load_model(model_path)


@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file was uploaded
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # Set the maximum content length to 10MB
    # print(request.data)
    print("Request JSON ===========>", request.json)
    print("Request images field ===========>", request.json["images"])

    if not request.json or 'path' not in request.json["images"][0]:
        return jsonify({'error': 'No file URL provided'}), 400

    file_url = request.json["images"][0]['path']

    try:
        # Download the image from the URL
        file = urllib.request.urlopen(file_url).read()
        img = cv2.imdecode(np.frombuffer(file, np.uint8), cv2.IMREAD_COLOR)
    except:
        return jsonify({'error': 'Failed to download or read the image'}), 400

    # Check if the image size is too large
    if img.size > app.config['MAX_CONTENT_LENGTH']:
        return jsonify({'error': 'Image is too large'}), 400

    # Preprocess the image
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (150, 150))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    # img /=  255.

    # Make prediction
    preds = model.predict(img)
    pred = np.argmax(preds, axis=1)

    # Return the prediction as a string
    if pred == 0:
        return jsonify({'prediction': 'glioma_tumor'}), 200
    elif pred == 1:
        return jsonify({'prediction': 'no_tumor'}), 200
    elif pred == 2:
        return jsonify({'prediction': 'meningioma_tumor'}), 200
    elif pred == 3:
        return jsonify({'prediction': 'pituitary_tumor'}), 200
    else:
        return jsonify({'prediction': 'no_brain'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)