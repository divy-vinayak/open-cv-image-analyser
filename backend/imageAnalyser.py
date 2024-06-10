import cv2
import numpy as np
from io import BytesIO

def get_dominant_color(image, k=1):
    # Convert image to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Reshape the image to be a list of pixels
    pixels = image.reshape(-1, 3)
    # Convert to float
    pixels = np.float32(pixels)
    # Define criteria and apply kmeans()
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
    _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    # Convert back to 8 bit values
    centers = np.uint8(centers)
    # Get the dominant color
    dominant_color = centers[0]
    return dominant_color

def read_image_from_file_like(file_like):
    file_like.seek(0)  # Ensure you're at the start of the file
    file_bytes = np.asarray(bytearray(file_like.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    return image

def analyze_image(file_like):
    image = read_image_from_file_like(file_like)

    # Assume that the strip is divided evenly and preprocess accordingly
    # Split the image into 10 parts vertically
    height, width, _ = image.shape
    strip_height = height // 10

    colors = ['URO', 'BIL', 'KET', 'BLD', 'PRO', 'NIT', 'LEU', 'GLU', 'SG', 'PH']
    color_dict = {}

    for i, color in enumerate(colors):
        # Crop the image to the area of the current strip
        strip_img = image[i * strip_height:(i + 1) * strip_height, :]
        # Get the dominant color in the current strip
        dominant_color = get_dominant_color(strip_img)
        # Add the color to the dictionary
        color_dict[color] = dominant_color.tolist()

    return color_dict
