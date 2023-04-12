import { BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import "antd/dist/reset.css";
import Switch from "./routes/Switch";
import Header from "./components/Header";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Switch />
            </BrowserRouter>
        </div>
    );
}

export default App;
