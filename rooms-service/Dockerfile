# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file first to leverage Docker's caching mechanism
COPY requirements.txt .

# Install the necessary Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port for the Flask app
EXPOSE 5003

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5003"]
