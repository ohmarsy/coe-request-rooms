from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def rooms():
    return jsonify({"message": "Hello from Rooms Service!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)
