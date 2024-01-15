import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

class FaceRecognizer:
    def __init__(self):
        self.detector = hub.load("https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2")
        self.embedding_model = hub.KerasLayer("https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/feature_vector/4")
        self.known_faces = []
        self.threshold = 0.6

    def detect_faces(self, frame):
        detections = self.detector(frame)
        return detections

    def get_embedding(self, face):
        return self.embedding_model(face[np.newaxis, ...]).numpy()

    def is_face_new(self, face_encoding):
        if len(self.known_faces) == 0:
            return True

        distances = [np.linalg.norm(face_encoding - known_face) for known_face in self.known_faces]
        
        return np.min(distances) > self.threshold

if __name__ == "__main__":
    recognizer = FaceRecognizer()
    stream_capture = cv2.VideoCapture("rtsp://88.198.24.22/news24")

    while True:
        ret, frame = stream_capture.read()
        if not ret:
            print("Failed to fetch frame from stream")
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        detections = recognizer.detect_faces(frame_rgb[np.newaxis, ...])

        detection_boxes = detections['detection_boxes'][0].numpy()
        detection_scores = detections['detection_scores'][0].numpy()

        height, width, _ = frame.shape

        for score, box in zip(detection_scores, detection_boxes):
            if score > 0.5:
                y1, x1, y2, x2 = box
                face = frame_rgb[int(y1*height):int(y2*height), int(x1*width):int(x2*width)]
                face_resized = cv2.resize(face, (224, 224))  # Resize to MobileNet's expected input size
                face_encoding = recognizer.get_embedding(face_resized)

                if recognizer.is_face_new(face_encoding):
                    recognizer.known_faces.append(face_encoding)
                    print("New face detected and added to the list!")
                cv2.rectangle(frame, (int(x1*width), int(y1*height)), (int(x2*width), int(y2*height)), (0, 255, 0), 2)

        cv2.imshow('Stream', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    stream_capture.release()
    cv2.destroyAllWindows()
