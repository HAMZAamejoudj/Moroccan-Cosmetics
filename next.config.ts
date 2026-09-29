import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);

const nextConfig: NextConfig = {
  // Comment out the line below if you want to use cPanel Node.js App instead of Static Export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export / basic hosting
  },
};

export default withNextIntl(nextConfig);
