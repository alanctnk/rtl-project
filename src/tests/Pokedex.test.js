import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../components/Pokedex';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

const nxtid = 'next-pokemon';
const favorites = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });
  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo
  pokémon é clicado.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const pikachu = pokemons[0].name;
    const nextBtn = screen.getByText('Próximo pokémon');
    for (let i = 0; i < pokemons.length; i += 1) {
      userEvent.click(nextBtn);
    }
    const name = screen.getByTestId('pokemon-name').textContent;
    expect(name).toBe(pikachu);
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { container } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );
    const pokemon = container.getElementsByClassName('pokemon');
    expect(pokemon.length).toEqual(1);
  });
  test('Teste se a Pokédex tem os botões de filtro - parte 1.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const fireBtn = screen.getByText('Fire');
    const nextBtn = screen.getByTestId(nxtid);
    userEvent.click(fireBtn);
    userEvent.click(nextBtn);
    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro - parte 2.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const arr = pokemons.reduce((types, { type }) => [...types, type], []);
    const pokemonTypes = [...new Set(arr)];
    const types = screen.getAllByTestId('pokemon-type-button');
    pokemonTypes.forEach((type, index) => {
      const bool = type === types[index].textContent;
      expect(bool).toBe(true);
      expect(types[index]).toBeInTheDocument();
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    // testa se o botão está na tela
    const allBtn = screen.getByText('All');
    expect(allBtn).toBeInTheDocument();
    // testa se está selecionado All quando carregado
    const nextBtn = screen.getByTestId(nxtid);
    for (let i = 0; i < 2; i += 1) {
      userEvent.click(nextBtn);
    }
    const caterpie = screen.getByText('Caterpie').textContent;
    expect(caterpie).toBe(pokemons[2].name);
    // testa se o filtro All é setado quando clicado
    userEvent.click(allBtn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  test(`Teste se é criado, dinamicamente, um botão de filtro para cada tipo
  de Pokémon.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const allButton = screen.getByText('All');
    const allTypes = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const types = typeButtons.map((el) => el.textContent);
    allTypes.forEach((type, index) => {
      const bool = types.includes(type);
      expect(bool).toBe(true);
      expect(typeButtons[index]).toBeInTheDocument();
    });
    expect(allButton).toBeInTheDocument();
  });
  test(`O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de
  Pokémons tiver um só pokémon.`, () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorites }
    />);
    const bugBtn = screen.getByText('Bug');
    const nextBtn = screen.getByTestId(nxtid);
    userEvent.click(bugBtn);
    expect(nextBtn.disabled).toBe(true);
  });
});
