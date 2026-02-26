import type { windowKeyType } from "@/store/window/window.types";

export type LocationKind = "folder" | "file";
export type LocationFileType = "txt" | "url" | "img" | "fig" | "pdf";

export interface BaseLocationItem {
  id: number;
  name: string;
  icon: string;
  kind: LocationKind;
  position?: string;
  windowPosition?: string;
}

export interface LocationFileItem extends BaseLocationItem {
  kind: "file";
  fileType: LocationFileType;
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  image?: string;
  description?: string[];
}

export interface LocationFolderItem extends BaseLocationItem {
  kind: "folder";
  children: LocationItem[];
}

export type LocationItem = LocationFileItem | LocationFolderItem;

export interface LocationRoot extends BaseLocationItem {
  kind: "folder";
  type: "work" | "about" | "resume" | "trash";
  children: LocationItem[];
}

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

export interface locationsType {
  work: LocationRoot;
  about: LocationRoot;
  resume: LocationRoot;
  trash: LocationRoot;
}

export type LocationChild = LocationItem;
