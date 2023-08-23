import './App.css';
import { useState } from 'react';
import cross from './cross.png'
import circle from './circle.png'
import vs from './vs.png'

function WinnerDecl({value, next}) {
	next = next ? 'x':'o';
	if (value[0] === null) {
		return (
			<div className="winner">&#128073;<Img value = {next} />&#128072;</div>
		)
	} else if (value[0].length === 1) {
		return (
			<div className="winner">&#128081;&#128525;<Img value = {value[0]} />&#128526;&#128081;</div>
		)
	} else if (value[0] === 0) {
		return (
			<div className="winner">&#128515;<Img value = {'x'} /><img src={vs} className="vs"/><Img value = {'o'} />&#128527;</div>
		)
	} else {
		return (
			<div className="winner">Match Drawn &#128529;</div>
		)
	}
}

function Img({value}) {
	return value==='x'?<img src={cross} />:<img src={circle} />
}

function Box({value, onBoxClick, isWinCell}) {
	console.log(value===null);
	if (value===null) {
		return <div className = "box" onClick={onBoxClick}></div>
	}
	return (
		<div className = {isWinCell ? "wincell":"box"} onClick={onBoxClick}>
			<Img value={value}/>
		</div>
	)
}

function Stats({value, score}) {
	return (
		<div className='stats' value={value}>
			<span>{value}</span>
			<span className='points'><b>{score}</b></span>
		</div>
	)
}

function Button({cls, btnHandler}) {
	return (
		<div className={cls} onClick = {btnHandler}>{cls}</div>
	)
}

function Board() {
	const [boxes, setBoxes] = useState(Array(9).fill(null));
	const [xIsNext, setxIsNext] = useState(true);
	const [winData, setWinData] = useState([0, ['null']])
	const [points, setPoints] = useState([0,0,0]);

	function calcWinner(boxes) {
		const winCombo = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];
		
		for (let c of winCombo) {
			if (boxes[c[0]] && 
				boxes[c[0]] === boxes[c[1]] && 
				boxes[c[0]] === boxes[c[2]]) {
					boxes[c[0]] === 'x'?points[0]++:points[2]++;
					return [boxes[c[0]], c];
			}
		} 

		var allFill = true;
		for (let b of boxes) {
			if (b === null) allFill = false;
		} if (allFill) {
			points[1]++;
			return ['DW', ['null']]
		} return [null, ['null']]
	}

	function crossOrDot(i) {
		const newBoxes = boxes.slice();
		if (calcWinner(newBoxes)[0] === null && newBoxes[i] === null) {
			newBoxes[i] = xIsNext ? 'x':'o';
			console.log(newBoxes);
			setBoxes(newBoxes);
			setxIsNext(!xIsNext);
			setWinData(calcWinner(newBoxes));
		}
	}

	function clearBoard() {
		setBoxes(Array(9).fill(null));
		setxIsNext(true);
		setWinData([0, ['null']]);
	}

	function clearAll() {
		clearBoard();
		setPoints([0,0,0]);
	}

	return (
		<div id="board">
			<Button cls={"restart"} btnHandler={clearBoard}/><Button cls={"reset"} btnHandler={clearAll}/><Button cls={"undo"}/>
			<WinnerDecl value={winData} next={xIsNext}/>
			<Box value = {boxes[0]} isWinCell={winData[1].includes(0)} onBoxClick={()=>crossOrDot(0)}/>
			<Box value = {boxes[1]} isWinCell={winData[1].includes(1)} onBoxClick={()=>crossOrDot(1)}/>
			<Box value = {boxes[2]} isWinCell={winData[1].includes(2)} onBoxClick={()=>crossOrDot(2)}/>
			<Box value = {boxes[3]} isWinCell={winData[1].includes(3)} onBoxClick={()=>crossOrDot(3)}/>
			<Box value = {boxes[4]} isWinCell={winData[1].includes(4)} onBoxClick={()=>crossOrDot(4)}/>
			<Box value = {boxes[5]} isWinCell={winData[1].includes(5)} onBoxClick={()=>crossOrDot(5)}/>
			<Box value = {boxes[6]} isWinCell={winData[1].includes(6)} onBoxClick={()=>crossOrDot(6)}/>
			<Box value = {boxes[7]} isWinCell={winData[1].includes(7)} onBoxClick={()=>crossOrDot(7)}/>
			<Box value = {boxes[8]} isWinCell={winData[1].includes(8)} onBoxClick={()=>crossOrDot(8)}/>	
			<Stats value={"X"} score={points[0]}/> <Stats value={"Ties"} score={points[1]}/> <Stats value={"O"} score={points[2]}/>
 		</div>
	)
}

export default function App() {
	return (
		<Board />
	);
}
