import dotenv from 'dotenv';

dotenv.config()

export default{
    port :process.env.PORT,
    db_url:process.env.DB_URL,
    jwt_secret:process.env.JWT_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloudinary_url:process.env.CLOUDINARY_URL,
}

