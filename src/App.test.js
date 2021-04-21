import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskbox title', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Taskbox/i);
  expect(linkElement).toBeInTheDocument();
});
