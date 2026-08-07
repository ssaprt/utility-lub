import { Recording } from "@/components/notes/Version/Version";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const defaulVersionURL = apiUrl
    ? `${apiUrl}/changer-version-npm?packageName=`
    : "";

export const getVersionPackages = async (
    packageName: string,
): Promise<Recording[] | null> => {
    try {
        const response = await fetch(`${defaulVersionURL}${packageName}`);

        if (response.ok) {
            const data = await response.json();
            return data;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
