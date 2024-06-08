from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Koneksi ke MongoDB Atlas
uri = "mongodb+srv://desakiintan25:denpasar01@cluster0.hosql1f.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['db_raspberry']
collection = db['cv_bali_raspberry']

# Endpoint API untuk mengambil data dari MongoDB Atlas
@app.route('/data')
def get_data():
    data = list(collection.find())  # Ambil data dari MongoDB
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)