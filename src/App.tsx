import React from 'react';
import { ImageMarker } from "./components/ImageMarker"
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				Wähle eine Datei um dein Zitat auszulesen
			</header>
			<ImageMarker />
		</div>
	);
}

export default App;
