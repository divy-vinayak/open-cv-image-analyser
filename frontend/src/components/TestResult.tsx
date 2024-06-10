import { Result } from "../types";

export default function TestResult({ result }: { result: Result }) {
    console.log({result})
    return <pre>
        {JSON.stringify(result, null, 2)}
    </pre>
}
