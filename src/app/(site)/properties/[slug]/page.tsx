import { Metadata } from "next";
import { propertyHomes } from '@/app/api/propertyhomes';
import PropertyDetails from "./PropertyDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = propertyHomes.find((p) => p.slug === slug);

  if (!item) {
    return {
      title: "Property Not Found | Walldot Builders",
    };
  }

  const title = `${item.name} — ${item.beds} BHK, ${item.area} sq ft in ${item.location} | Walldot Builders`;
  const description = `Explore ${item.name} — a ${item.beds}-bedroom, ${item.area} sq ft home in ${item.location}, built by Walldot Builders. Quality construction with premium materials.`;
  const imageUrl = item.images?.[0]?.src ?? "/images/og-default.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return propertyHomes.map((p) => ({ slug: p.slug }));
}

export default async function DetailsPage({ params }: Props) {
  const { slug } = await params;
  return <PropertyDetails slug={slug} />;
}
