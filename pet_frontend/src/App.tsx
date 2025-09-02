import './App.css'
import AppRoutes from './routes/AppRoutes';
import { Bounce, ToastContainer, } from "react-toastify";

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        draggable
        theme='colored'
        transition={Bounce}
        
      />
    </>
  )
}

export default App;
