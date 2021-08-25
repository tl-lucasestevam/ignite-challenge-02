import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { MoviesContextProvider } from './Contexts/MoviesContext';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MoviesContextProvider>
        <SideBar/>
        <Content/>
      </MoviesContextProvider>
    </div>
  )
}