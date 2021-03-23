import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.board[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }
  
    render() {  
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
  
class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            history: [{
                board: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const board = history[history.length - 1].board.slice()

        if (board[i] || calculateWinner(board)) { return }

        board[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{ board }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }
    
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history
        const curr = history[this.state.stepNumber]
        console.log(this.state, 'game state')
        const winner = calculateWinner(curr.board)

        const moves = history.map((step, move) => {
            const text = move 
                ? `Go to move #${move}`
                : 'Go to game start'
            return (
                <li key={move}>
                    <button className="preview-btn" onClick={() => this.jumpTo(move)}>{text}</button>
                </li>
            )
        })

        let status
        if (winner) {
            status = 'Game winner is: ' + winner
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        board={curr.board}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    <div>{status}</div>

                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i of lines) {
        const [a, b, c] = i
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
) 