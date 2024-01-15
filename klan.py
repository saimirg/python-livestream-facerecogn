import cv2
import dlib
import datetime
import time

# Initialize the face detector
face_detector = dlib.get_frontal_face_detector()

# Open an RTSP stream
rtsp_url = "rtsp://88.198.24.22/klan"
cap = cv2.VideoCapture(rtsp_url)

# Initialize a counter for the saved faces
face_counter = 0

# Set the interval for face detection (in seconds)
detection_interval = 2  # 4 seconds

# Store the time of the last detection
last_detection_time = time.time()

# Initialize the 'faces' variable as an empty list
faces = []

while True:
    ret, frame = cap.read()

    if not ret:
        print("Failed to capture frame from the RTSP stream. Reconnecting...")
        time.sleep(2)  # Delay before reconnection attempt
        cap.release()
        cap = cv2.VideoCapture(rtsp_url)
        continue

    current_time = time.time()
    if current_time - last_detection_time >= detection_interval:
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray_frame)

        for face in faces:
            x, y, w, h = face.left(), face.top(), face.width(), face.height()

            # Validate coordinates and ensure they are within the frame
            x, y = max(0, x), max(0, y)
            w, h = min(w, frame.shape[1] - x), min(h, frame.shape[0] - y)

            # Check if the detected face is not too small
            if w * h < 100:  # You can adjust this threshold
                continue

            cropped_face = frame[y:y + h, x:x + w]
            if cropped_face.size != 0:
                timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                face_filename = f"./images/klan_{timestamp}.jpg"
                cv2.imwrite(face_filename, cropped_face)
                print(f"Saved {face_filename}")
                face_counter += 1

        last_detection_time = current_time

    for face in faces:
        x, y, w, h = face.left(), face.top(), face.width(), face.height()
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv2.imshow('Face Detection from RTSP Stream', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
