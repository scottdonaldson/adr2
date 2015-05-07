# Components for ADR2 Final Assignment

1. imgur-upload/

Lightweight Node.js app that runs on Heroku. Accepts a `POST` request with base64-encoded image and uploads to Imgur. Returns the URL of the image, which it adds to a Firebase for this project.

2. three/

Interactive voxelizer. Pressing enter screenshots the current view and uploads to Imgur.

3. gallery/

Gallery for uploaded images, pulling from the Firebase containing all the image URLs.
