import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa
  não tiver pokémons favoritos.`, () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeDefined();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    App.state = { isPokemonFavoriteById: {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: true,
      148: false,
      151: false,
    } };
    const { isPokemonFavoriteById } = App.state;
    const favorites = data.filter(({ id }) => isPokemonFavoriteById[id]);
    const { container } = renderWithRouter(<FavoritePokemons
      pokemons={ favorites }
    />);
    const cards = container.getElementsByClassName('favorite-pokemon');
    expect(cards.length).toEqual(favorites.length);
  });
  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
    () => {
      const { container } = render(<FavoritePokemons pokemons={ [] } />);
      const cards = container.getElementsByClassName('favorite-pokemon');
      expect(cards.length).toBe(0);
    });
});
