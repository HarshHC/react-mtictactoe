import React from 'react'
import BoardRow from './BoardRow'

function Board() {
    return (
        <div className="board">
            {[0,1,2,3,4,5,6].map(function (n) {
                return <BoardRow key={n+(n*6)} rowNum={n}/>
            })}
        </div>
    )
}

export default Board
