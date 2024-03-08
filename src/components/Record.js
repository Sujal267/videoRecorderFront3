import { useReactMediaRecorder } from "react-media-recorder";
import { useState } from "react";
import axios from 'axios'

export function Record() {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true });
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        // console.log(mediaBlobUrl)
        // let str = String(mediaBlobUrl);
        // let parts = str.split("blob:");
        // let url2 = parts[2];

        // try {
        //     const response = await axios.get(url2, { responseType: 'blob' });
        //     const url = window.URL.createObjectURL(new Blob([response.data]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', 'video.mp4'); // Set the desired file name and extension
        //     document.body.appendChild(link);
        //     link.click();
        // } catch (error) {
        //     console.error('Error downloading video:', error);
        // }

        const formData = new FormData();
        formData.append('video', file);


        try {
            console.log("caklled")
            await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("caklled2")
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <div>
            <p>{status}</p>
            <button onClick={startRecording} style={{ margin: "20px" }}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload Video</button>
            <div>
                <video src={mediaBlobUrl} controls />
            </div>

        </div>
    );
};