export default function sitemap() {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
