import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';

function App() {
  let undoStack = [], redoStack = [];
  return (
    <div className="App">
      <Toolbar undoStack={undoStack} redoStack={redoStack}/>
      <Canvas undoStack={undoStack} redoStack={redoStack}/>
    </div>
  );
}

export default App;
