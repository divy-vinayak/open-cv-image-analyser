from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from imageAnalyser import analyze_image

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    # got the file here
    # process image file -> extract the result schema -> send back to user
    print(file.file)
    res = analyze_image(file.file)
    return {"data": res}