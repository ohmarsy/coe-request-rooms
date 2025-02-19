from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def auth():
    return jsonify({"message": "Hello from Auth Service!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
