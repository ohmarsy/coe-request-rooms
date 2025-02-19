from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello from Dashboard Service!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
