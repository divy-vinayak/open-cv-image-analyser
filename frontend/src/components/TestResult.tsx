import { Result } from "../types";

export default function TestResult({ result }: { result: Result }) {
    console.log({result})
    return <>
        {result.toString()}
    </>
}
