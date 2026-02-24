import type { windowKeyType } from "@/store/window/window.types";

export interface blogPostsType {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}

export interface dockAppsType {
  id: windowKeyType;
  name: string;
  icon: string;
  canOpen: boolean;
}

export interface navLinksType {
  id: number;
  name: string;
  type: windowKeyType;
}
