import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

const pngSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
describe('Teste o componente <About.js /.>', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const aboutTitle = screen.getByText('About Pokédex');
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 }).innerHTML;
    expect(heading).toBe('About Pokédex');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library
    const { container } = render(<About />);
    const paragraphs = container.getElementsByTagName('p');
    expect(paragraphs.length).toBe(2);
    const validParagraphs = paragraphs[0].innerHTML !== ''
    && paragraphs[1].innerHTML !== '';
    expect(validParagraphs).toBe(true);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { container } = render(<About />);
    const imgSrc = container.querySelector('img').src;
    expect(imgSrc).toEqual(pngSrc);
  });
});
