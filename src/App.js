import './App.css';
import { useState } from 'react';
import {WinnerDecl, Box, Stats, Button} from './components.js'

export default function App() {
	const [boxes, setBoxes] = useState(Array(9).fill(null));
	const [xIsNext, setxIsNext] = useState(true);
	const [winData, setWinData] = useState([0, ['null']]);
	const [points, setPoints] = useState([0,0,0]);
	const [gamePlay, setGamePlay] = useState([[boxes], [winData], [points]]);

	function calcWinner(boxes) {
		// var newPoints = points.slice();
		const winCombo = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];
		
		for (let c of winCombo) {
			if (boxes[c[0]] && 
				boxes[c[0]] === boxes[c[1]] && 
				boxes[c[0]] === boxes[c[2]]) {
					// boxes[c[0]] === 'x'?newPoints[0]++:newPoints[2]++;
					// setPoints(newPoints);
					// gamePlay[2].push(newPoints);
					return [boxes[c[0]], c];
			}
		} 
	
		var allFill = true;
		for (let b of boxes) {
			if (b === null) allFill = false;
		} if (allFill) {
			// newPoints[1]++;
			// setPoints(newPoints);
			// gamePlay[2].push(newPoints);
			return ['DW', ['null']]
		} return [null, ['null']]
	}

	function crossOrDot(i) {
		const newBoxes = boxes.slice();
		const newPoints = points.slice();

		if (calcWinner(newBoxes)[0] === null && newBoxes[i] === null) {
			newBoxes[i] = xIsNext ? 'x':'o';
			setBoxes(newBoxes);
			setxIsNext(!xIsNext);
			const curWinData = calcWinner(newBoxes);
			setWinData(curWinData);
			
			if (curWinData[0] === 'DW') {
				newPoints[1]++;
			} else if (curWinData[0] === 'x') {
				newPoints[0]++;
			} else if (curWinData[0] === 'o') {
				newPoints[2]++;
			}
			
			setPoints(newPoints);
			gamePlay[0].push(newBoxes);
			gamePlay[1].push(curWinData);
			gamePlay[2].push(newPoints);
		}
	}

	function clearBoard() {
		setBoxes(Array(9).fill(null));
		setxIsNext(true);
		setWinData([0, ['null']]);
		setGamePlay([[Array(9).fill(null)], [[0, ['null']]], [points]]);
	}

	function clearAll() {
		clearBoard();
		setPoints([0,0,0]);
		setGamePlay([[Array(9).fill(null)], [[0, ['null']]], [[0,0,0]]]);
	}

	function goBack() {
		var noEffect = true;
		gamePlay.forEach(array => {
			if (array.length > 1) {
				array.pop();
				noEffect = false;
			}
		});

		if (noEffect) return;
	
		// set things back
		setBoxes(gamePlay[0][gamePlay[0].length-1]);
		setxIsNext(!xIsNext);
		setWinData(gamePlay[1][gamePlay[1].length-1]);
		setPoints(gamePlay[2][gamePlay[2].length-1]);
	}

	return (
		<div id="board">
			<Button cls={"restart"} btnHandler={clearBoard}/>
			<Button cls={"reset"} btnHandler={clearAll}/>
			<Button cls={"undo"} btnHandler={goBack}/>
			<WinnerDecl value={winData} next={xIsNext}/>
			{boxes.map((value, i) => {
				return (
					<Box key = {i} value = {value} isWinCell={winData[1].includes(i)} onBoxClick={()=>crossOrDot(i)}/>	
				)
			})}
			{["X", "Ties", "O"].map((value, i) => {
				return (
					<Stats key = {i} value={value} score={points[i]}/> 
				)
			})}
 		</div>
	)
}