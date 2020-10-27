import React from 'react'
import Square from './Square'

function BoardRow(props) {
    return (
        <div className="board-row">
            {[0,1,2,3,4,5].map(function (n) {
                var id = (props.rowNum * 6) + n
                return <Square key={id} id={id} />
            })}
        </div>
    )
}

export default BoardRow

