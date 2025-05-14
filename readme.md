# Blog App

## Backend

- Express
- Mongo DB
- Cloudinary for uploading images

### setup

- note : setup the env file before starting the backend

```
PORT=3000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
JWT_LIFETIME=7d
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

- install all packages

```
npm i
```

- start dev server:

```
npm run dev
```
