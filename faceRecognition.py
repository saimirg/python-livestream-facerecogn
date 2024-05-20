# import cv2
# import dlib
# import datetime
# import time
# import numpy as np

# class FaceRecognition:
#     def __init__(self, rtsp_url, shape_predictor_path, face_model_path):
#         self.face_detector = dlib.get_frontal_face_detector()
#         self.shape_predictor = dlib.shape_predictor(shape_predictor_path)
#         self.face_recognition_model = dlib.face_recognition_model_v1(face_model_path)
#         self.cap = cv2.VideoCapture(rtsp_url)
#         self.face_descriptors = {}
#         self.face_id_counter = 0
#         self.threshold = 0.6
#         self.detection_interval = 2
#         self.last_detection_time = time.time()
#         self.recognized_faces = []  

#     def recognize_faces(self, frame):
#         gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = self.face_detector(gray_frame)
#         self.recognized_faces.clear()  # Clear the list before processing

#         for face in faces:
#             x, y, w, h = face.left(), face.top(), face.width(), face.height()
#             x, y = max(0, x), max(0, y)
#             w, h = min(w, frame.shape[1] - x), min(h, frame.shape[0] - y)

#             if w * h < 100:
#                 continue

#             shape = self.shape_predictor(gray_frame, face)
#             face_descriptor = np.array(self.face_recognition_model.compute_face_descriptor(frame, shape))

#             found_matching_face = False
#             for known_descriptor, face_id in self.face_descriptors.items():
#                 distance = np.linalg.norm(face_descriptor - known_descriptor)
#                 if distance < self.threshold:
#                     found_matching_face = True
#                     self.recognized_faces.append((face_id, (x, y, w, h)))
#                     break

#             if not found_matching_face:
#                 detected_id = self.face_id_counter
#                 self.face_descriptors[tuple(face_descriptor)] = detected_id
#                 self.recognized_faces.append((detected_id, (x, y, w, h)))
#                 self.face_id_counter += 1

#         return self.recognized_faces

#     def run_face_recognition(self):
#         while True:
#             ret, frame = self.cap.read()

#             if not ret:
#                 print("Failed to capture frame from the RTSP stream. Reconnecting...")
#                 time.sleep(2)
#                 self.cap.release()
#                 self.cap = cv2.VideoCapture(self.rtsp_url)
#                 continue

#             current_time = time.time()
#             if current_time - self.last_detection_time >= self.detection_interval:
#                 recognized_faces = self.recognize_faces(frame)

#                 for face_id, (x, y, w, h) in recognized_faces:
#                     cropped_face = frame[y:y + h, x:x + w]
#                     if cropped_face.size != 0:
#                         timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
#                         face_filename = f"./images/topchannel_{timestamp}_ID{face_id}.jpg"
#                         cv2.imwrite(face_filename, cropped_face)
#                         print(f"Saved {face_filename}")

#                 self.last_detection_time = current_time

#             for face_id, (x, y, w, h) in self.recognized_faces:
#                 cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#             cv2.imshow('Face Detection from RTSP Stream', frame)

#             if cv2.waitKey(1) & 0xFF == ord('q'):
#                 break

#         self.cap.release()
#         cv2.destroyAllWindows()


# # Example usage:
# if __name__ == "__main__":
#     rtsp_url = "http://176.9.125.94:8081/yWbXvr1S/kashara/playlist.m3u8"
#     shape_predictor_path = "shape_predictor_68_face_landmarks.dat"
#     face_model_path = "dlib_face_recognition_resnet_model_v1.dat"

#     face_recognition = FaceRecognition(rtsp_url, shape_predictor_path, face_model_path)
#     face_recognition.run_face_recognition()


import cv2
import dlib
import datetime
import time
import numpy as np

# Initialize the face detector
face_detector = dlib.get_frontal_face_detector()

# Initialize the face recognition
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
face_recognition_model = dlib.face_recognition_model_v1("dlib_face_recognition_resnet_model_v1.dat")

# Open an RTSP stream
rtsp_url = "http://176.9.125.94:8081/yWbXvr1S/kashara/playlist.m3u8"
cap = cv2.VideoCapture(rtsp_url)

# Initialize a counter for the saved faces
face_counter = 0

# Set the interval for face detection (in seconds)
detection_interval = 2  # 4 seconds

# Store the time of the last detection
last_detection_time = time.time()

# Initialize a dictionary to store face descriptors and their IDs
face_descriptors = {}
face_id_counter = 0

# Initialize the 'faces' variable as an empty list
faces = []

# Add threshold
threshold = 0.6 # Adjust this threshold

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

            # Extract face landmarks
            shape = shape_predictor(gray_frame, face)
            
            # Recognize face
            face_descriptor = np.array(face_recognition_model.compute_face_descriptor(frame, shape))
            
            # Check if the face is already known
            found_matching_face = False
            for known_descriptor, face_id in face_descriptors.items():
                # Euclidean distance between descriptors
                distance = np.linalg.norm(face_descriptor - known_descriptor)
                if distance < threshold:  
                    found_matching_face = True
                    detected_id = face_id
                    break

            if not found_matching_face:
                # Assign a new ID to the face
                detected_id = face_id_counter
                face_descriptors[tuple(face_descriptor)] = detected_id
                face_id_counter += 1
                # print('face_counter_id: ', face_id_counter)

            cropped_face = frame[y:y + h, x:x + w]
            if cropped_face.size != 0:
                timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                face_filename = f"./images/tvChannel_{timestamp}_ID{detected_id}.jpg"
                cv2.imwrite(face_filename, cropped_face)
                print(f"Saved {face_filename}")
                face_counter += 1
                # print('face_counter: ', face_counter)
        # print('detected_id ', detected_id)
        last_detection_time = current_time

    for face in faces:
        # print('detected_id2 ', detected_id)
        x, y, w, h = face.left(), face.top(), face.width(), face.height()
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        # cv2.putText(frame, f'ID_{detected_id}', (x + 10, y + 15), cv2.FONT_HERSHEY_DUPLEX, 0.5, (200, 200, 200))

    cv2.imshow('Face Detection from RTSP Stream', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()