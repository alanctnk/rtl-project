import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as informações de determinado
  pokémon.`, () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemons[7] } />);
    const name = screen.getByText(pokemons[7].name);
    const type = screen.getByText(pokemons[7].type);
    const { averageWeight: { value, measurementUnit } } = pokemons[7];
    const text = `Average weight: ${value} ${measurementUnit}`;
    const info = screen.getByText(text);
    const image = screen.getByRole('img');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(image.src).toBe(pokemons[7].image);
    expect(image.alt).toBe(`${pokemons[7].name} sprite`);
  });
  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste Pokémon.`, () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite={ false }
      pokemon={ pokemons[7] }
    />);
    const link = screen.getByRole('link');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[7].id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ pokemons[7] } />);
    const star = screen.getByAltText(`${pokemons[7].name} is marked as favorite`);
    // Lucas Martins explicou-me sobre este matcher que recebe um 2º param que é o valor do atributo.
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
