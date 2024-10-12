import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Iniciar sesión link', () => {
  render(<App />);
  
  // Busca todos los elementos que contienen el texto "Iniciar sesión"
  const linkElements = screen.getAllByText(/Iniciar sesión/i);
  
  // Asegúrate de que al menos uno esté presente
  expect(linkElements.length).toBeGreaterThan(0);
});
