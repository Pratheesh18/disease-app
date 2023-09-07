from flask import Flask, jsonify, request
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('E:/3rd year/CNN.h5')

model.summary()



@app.route('/predicts' , methods=['POST'])
def predict():
    print("Received POST request to /predicts endpoint")
    image = request.files['image']
    
    print("image " , image)
    img = Image.open(image)
    img = img.resize((150,150))
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array , axis=0)

    predictions = model.predict(img_array)

    labels = [  'Gudi_rotten' , 'Healthy' ,'apex_blast', 'leaf_blast' , 'leaf_burn' , 'neck_blast_paddy']
    predicted_label = labels[np.argmax(predictions)]
    print("Prediction done")

    return jsonify({'prediction' : predicted_label})
 



if __name__ == '__main__':
    app.run(debug=True)