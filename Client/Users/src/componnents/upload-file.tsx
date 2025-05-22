import { useEffect, useState } from "react";
import { generateUniquePassword } from "./password-generator";
import CryptoJS from 'crypto-js';
import { readFile } from "./read-from-file";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import awsConfig from "./aws-config";


const UploadFileToAWS = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [lengthOfPassword, setLengthOfPassword] = useState<number>(12);
    const [password, setPassword] = useState("");

    const s3Client = new S3Client({
        region: awsConfig.region,
        credentials: {
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey
        }
    });

    const uploadFile = async () => {
        if (files) {
            const contentOfFile = readFile(files[0]);
            const encryptedContentFile = CryptoJS.AES.encrypt(contentOfFile, password).toString();

            const params = {
                Bucket: awsConfig.bucketName,
                Key: `muganim_${Date.now()}_file`,
                Body: encryptedContentFile,
                ContentType: 'text/plain'
            };
            
            try {
                const command = new PutObjectCommand(params);
                await s3Client.send(command);
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 10);
        const valuesToRand = [16, 17, 20, 15, 18, 22, 23, 21, 25, 20]
        setLengthOfPassword(valuesToRand[randomIndex]);
        setPassword(generateUniquePassword(lengthOfPassword));
    }, [files])

    return <>
        <input type="file" onChange={({ target }) => setFiles(target.files)} />
        <button onClick={uploadFile}>Upload Files</button>
    </>
}
export default UploadFileToAWS;