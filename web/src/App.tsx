import { Routes, BrowserRouter, Route } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import CreateWorkflow from './components/CreateWorkflow';


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<CreateWorkflow />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
