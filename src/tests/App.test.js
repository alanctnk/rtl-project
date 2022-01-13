import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test <App.js />', () => {
  test('Teste se a página principal da Pokédex é renderizada no caminho de URL /', () => {
    const { getByText } = render(
      <MemoryRouter
        initialEntries={ ['/about', '/', '/favorites', '/pokemons/:id'] }
        initialIndex={ 1 }
      >
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  test(`Teste se o topo da aplicação contém um conjunto fixo de links
  de navegação.`, () => {
    renderWithRouter(<App />);
    const links = screen.getAllByText(/Home|About|Favorite Pokémons/);
    const validOrder = links[0].innerHTML === 'Home' && links[1].innerHTML === 'About';
    expect(validOrder).toBe(true);
  });
  test(`Teste se a aplicação é redirecionada para a página inicial, na URL /
  ao clicar no link Home da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByText('Home')).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
  ao clicar no link About da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(getByText('About')).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de Favorite Pokémons, na URL
  /about, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma
  URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/paginanao/existe/eee');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
