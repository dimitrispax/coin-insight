import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: [
      '.next/**/*',
      'out/**/*',
      'build/**/*',
      'node_modules/**/*',
      '.env*',
      '.DS_Store',
      'package-lock.json',
      'yarn.lock',
    ],
  },
];

export default eslintConfig;
