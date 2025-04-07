from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, JWTManager

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# Dummy user database
users = {"test@example.com": {"password": "password123"}}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in users and users[email]["password"] == password:
        token = create_access_token(identity=email)
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)
