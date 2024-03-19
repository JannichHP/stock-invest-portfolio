import logo from './logo.svg';
import './App.css';
import StockPrices from './components/StockPrices';
import DisplayChart from './components/DisplayChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Enter a stock: </h2>
      </header>
      <div className="search">
        <p><StockPrices /></p>
      </div>
      <div className="chart">
        <p><DisplayChart /></p>
      </div>
    </div>
  );
}

export default App;
