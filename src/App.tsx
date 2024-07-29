import { Route, Routes } from 'react-router-dom';

import Main from '@/pages/Main';
import Password from '@/pages/Password';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </>
  );
}

export default App;
