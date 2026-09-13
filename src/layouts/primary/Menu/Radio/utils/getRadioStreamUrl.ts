import { apiUrl } from "@/lib/api/config";

export const getRadioStreamUrl = (uuid: string) => {
    return `${apiUrl}/radio/stations/${encodeURIComponent(uuid)}/stream`;
};
