import cross from './cross.png'
import circle from './circle.png'
import vs from './vs.png'

export function WinnerDecl({value, next}) {
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

export function Img({value}) {
	return value==='x'?<img src={cross} />:<img src={circle} />
}

export function Box({value, onBoxClick, isWinCell}) {
	// console.log(value===null);
	if (value===null) {
		return <div className = "box" onClick={onBoxClick}></div>
	}
	return (
		<div className = {isWinCell ? "wincell":"box"} onClick={onBoxClick}>
			<Img value={value}/>
		</div>
	)
}

export function Stats({value, score}) {
	return (
		<div className='stats' value={value}>
			<span>{value}</span>
			<span className='points'><b>{score}</b></span>
		</div>
	)
}

export function Button({cls, btnHandler}) {
	return (
		<div className={cls} onClick = {btnHandler}>{cls}</div>
	)
}
