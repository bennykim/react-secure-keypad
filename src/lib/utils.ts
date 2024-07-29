import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MAX_PROGRESS, USER_ID } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLinearValue(
  maxSize: number,
  selectedCount: number
): number {
  if (selectedCount >= maxSize) return MAX_PROGRESS;
  return (selectedCount / maxSize) * MAX_PROGRESS;
}

export function getUserId() {
  return USER_ID;
}
