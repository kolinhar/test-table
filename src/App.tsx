import { memo } from 'react';
import './App.css';
import Tablebase from './component/Tablebase';
import { HeaderTitle, StrOrNum } from './types';

const headers: HeaderTitle[] = [
  'activité',
  { name: 'personnel' },
  'maison',
  'tout le monde',
];
const datas: StrOrNum[][] = [
  ['elt1', 'elt1', 'elt1'],
  ['elt2', 12, 'elt2', 'elt2'],
  ['elt3', 'elt3', 'elt3', 'elt3', 34],
  ['elt4', 'elt4', 'elt4'],
];

function App() {
  return (
    <main>
      <header>
        <h1>Titre h1</h1>
      </header>
      <section>
        <Tablebase headers={headers} datas={datas} />
      </section>
    </main>
  );
}

export default memo(App);
