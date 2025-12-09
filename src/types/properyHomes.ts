import { StaticImageData } from "next/image"

export type PropertyHomes = {
  name: string
  slug: string
  location: string
  status: string
  review: string
  beds: number
  baths?: number
  rate?: string | number
  area: number
  clientImage: string | StaticImageData
  images: PropertyImage[]
}

interface PropertyImage {
  src: string;
}
