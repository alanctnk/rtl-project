import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2 com o texto Page requested
    not found.`, () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });
  test('', () => {
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const text = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(text);
    expect(img.src).toEqual(src);
  });
});
