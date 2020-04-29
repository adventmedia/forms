import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { Form } from "./form";
import { Result } from "./result";

function App() {
	return (
			<div className="App">
				<div>
					<h1>Jotform Test</h1>
				</div>
				<Router>
					<Switch>
						<Route path='/result'>
							<Result/>
						</Route>
						<Route path="/">
							<Form/>
						</Route>
					</Switch>
				</Router>
			</div>
	);
}

export default App;
