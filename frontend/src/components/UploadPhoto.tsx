import { Result } from "../types";
import { ChangeEvent, useState } from "react";

export function UploadPhoto({
    setResult,
}: {
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            setSelectedFileUrl(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            fetch("http://localhost:8000/uploadfile/", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setResult(data);
                    console.log(data);
                })
                .catch((error) => console.error("Error:", error));
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 w-1/4">
                <input type="file" onChange={handleFileChange} />
                <button
                    className="border-[1px] border-gray-600 bg-teal-500 hover:bg-teal-400 p-2 rounded-md"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </div>
            {selectedFileUrl ? (
                <img src={selectedFileUrl} className="w-20" />
            ) : (
                "Selected Image Preview"
            )}
        </div>
    );
}
