import envConfig from "@/config";


export const getImage = (urlImage: string) => {
    return `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/image/${urlImage}`;
}