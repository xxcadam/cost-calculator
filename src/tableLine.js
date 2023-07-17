import React, { useState } from 'react'

export default function TableLine() {
    const [count, setCount] = useState({
        type: "once"
    });

    return (
        <tr>
            <td><button>增加</button><button>减少</button></td>
            <td><input></input></td>
            <td>
                <select>
                    <option value="0" default>一次性</option>
                    <option value="1">每个</option>
                </select>
            </td>
            <td><input></input></td>

        </tr>
    )
}
