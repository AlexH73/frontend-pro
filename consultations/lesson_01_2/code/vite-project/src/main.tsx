import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { StrictMode } from 'preact/compat'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app')!
);
