import { Result } from '../types';
import { ChangeEvent, useState } from 'react';

export function UploadPhoto({setResult}: {setResult: React.Dispatch<React.SetStateAction<Result | null>>}) {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileUrl(URL.createObjectURL(e.target.files[0]))
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({data});
        setResult(data)
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='flex flex-col gap-2'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick} className='border-[1px] border-black p-2 rounded-md bg-gray-500 text-white hover:bg-gray-400'>Upload</button>
      {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
      {fileUrl ? <img src={fileUrl} className='w-20'/> : "Preview of Chosen Photo"}
    </div>
  );
}