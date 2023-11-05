import 'vitest';
import { TestingLibraryMatchers } from '@testing-library/react';

declare global {
  namespace Vi {
    interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {}
  }
}
