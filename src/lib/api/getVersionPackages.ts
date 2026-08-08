import { Recording } from "@/components/notes/Version/Version";
import { apiUrl } from "./config";

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
