import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Board from './components/Board/Board';
import Join from './components/Join/Join';

function App() {
  return (
  	<Router>
  		<Route path="/" exact component={Join} />
  		<Route path="/board" component={Board} />
  	</Router>
  );
}

export default App;
