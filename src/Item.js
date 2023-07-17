import React from 'react'
import "./Item.css"

export default function Item(props) {

    const deleteItemHandler = () => {
        // 临时性
        const isDel = window.confirm('该操作不可恢复，确认吗？');
        if (isDel){
            // 删除当前的item，要删除item，其实就是要从数据的state移除指定的数据
            props.onDelData();
        }
    };

    return (
        <div className='item'>
            <div className='name'>{props.name}</div>
            <div className="content">
                <h2 className="desc">{new Intl.NumberFormat("zh", {style:"currency", currency: "CNY"}).format(props.price)}</h2>
                <div className="time">{props.type}</div>
            </div>
            <div>
                <div onClick={deleteItemHandler} className='delete'>×</div>
            </div>
        </div>
    )
}
