export interface IUrl {
  pathname: string;
  query: {
    [key: string]: string;
  }
}

declare module '*.json';

declare module 'next/link';
