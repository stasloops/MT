import { MetadataRoute } from "next";

export const APP_NAME = "Magic-Task";
export const APP_DESCRIPTION = "Magic-Task | MT";
export const IMAGE = 'favicon.ico'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#1F1B24",
    theme_color: "#1F1B24",
    icons: [
      {
        src: IMAGE,
        sizes: "144x144",
        type: "image/ico",
      },
    ],
  };
}
