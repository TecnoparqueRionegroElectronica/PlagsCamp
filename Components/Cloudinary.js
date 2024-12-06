import axios from 'axios';

const uploadToCloudinary = async (fileUri, fileName, mimeType ) => {
    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        type: mimeType,
        name: fileName, 
    });

    formData.append('upload_preset', 'subir fotos');

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/duro1tbga/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadToCloudinary;