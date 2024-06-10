import { useState } from "react";
import { UploadPhoto } from "./UploadPhoto";
import { Result } from "../types";
import TestResult from "./TestResult";

export default function Analyser() {
    const [result, setResult] = useState<Result | null>(null);
    return (
        <>
            <div className="w-full h-full border-2 border-gray-400 rounded-lg p-2">
                <UploadPhoto setResult={setResult} />
            </div>
            <div className="w-full h-full border-2 border-gray-400 rounded-lg p-2">
                {result ? <TestResult result={result} /> : "Upload a file"}
            </div>
        </>
    );
}
