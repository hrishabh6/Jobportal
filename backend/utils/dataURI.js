import DataURIParser from 'datauri/parser.js';
import path from 'path';

const getDataURI = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error('Invalid file object'); // Ensure valid file input
    }

    const parser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    const result = parser.format(extName, file.buffer);
    
    if (!result || !result.content) {
        throw new Error('Failed to generate DataURI');
    }

    return result.content; // Return the content directly
};

export default getDataURI;
