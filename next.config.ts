import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "secure.meetupstatic.com",
      },
      {
        protocol: "https",
        hostname: "images.meetupstatic.com",
      },
      {
        protocol: "https",
        hostname: "maps-googleapis.meetup.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "secure-content.meetupstatic.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/join",
        destination: "https://www.meetup.com/aws-sbg-at-atria-inst-of-tech/",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/awssbg.atria/",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination:
          "https://www.linkedin.com/company/aws-sbg-at-atria-inst-of-tech",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/AWSSBGAtria",
        permanent: true,
      },
      {
        source: "/whatsapp",
        destination: "https://chat.whatsapp.com/IVLRT2xTxGwEJ502q1Kw4t",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
