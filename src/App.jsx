import router from './routes';
import { RouterProvider } from 'react-router-dom';
// import useAuthStore from '@/store/auth';
// import { useEffect } from 'react';

function App() {
  /* const authStore = useAuthStore();

  useEffect(() => {
    authStore.initialize();
  }, []); */
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;