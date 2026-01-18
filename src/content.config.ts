// src/content.config.ts ← NOU FIȘIER
import { defineCollection } from 'astro:content';

const services = defineCollection({});

export const collections = {
  services: services,
  'de': defineCollection({}),
  'en': defineCollection({}),
  'es': defineCollection({}),
  'fr': defineCollection({}),
  'it': defineCollection({}),
  'pt': defineCollection({}),
  'ro': defineCollection({})
};
