import React from 'react';
import { theme } from '@steelxorg/shared';
import { Baseline } from '@steelxorg/shell';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import '@steelxorg/shared/fonts/inter/inter.css';

export const decorators = [
  Story => (
    <MemoryRouter initialEntries={['/']}>
      <Baseline />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  )
];

export const parameters = {
  options: {
    storySort: {
      order: ['Introduction', 'Theming', '*']
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
