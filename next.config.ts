import type { NextConfig } from 'next';

const normalizedBasePath = (() => {
  const configured = process.env.BASE_PATH?.trim();
  if (configured) {
    return configured.startsWith('/') ? configured : `/${configured}`;
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]?.trim();
  if (process.env.GITHUB_ACTIONS === 'true' && repository) {
    return `/${repository}`;
  }

  return '';
})();

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath || undefined,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
