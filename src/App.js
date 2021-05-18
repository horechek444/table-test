import "./App.css";
import TableHead from "./components/tableHead/tableHead";
import ButtonAdd from "./components/buttonAdd/buttonAdd";
import TableBody from "./components/tableBody/tableBody";

const App = () => {
  return (
    <div className="page">
      <div className="page__cover">
        <ButtonAdd />
        <table className="table">
          <thead className="table__title">
            <TableHead />
          </thead>
          <tbody className="table__body">
            <TableBody />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
