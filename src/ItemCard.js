import React from 'react'
import Item from './Item'
import "./Item.css"

export default function ItemCard(props) {



    const itemComp = props.itemData.map((item, index) => <Item
        key={item.id}
        name={item.name}
        price={item.price}
        type={item.type} 
        onDelData={() => {props.onDelData(index)}}
        />);

    return (
        <div className='ItemCard'>
            {
                itemComp.length !== 0 ? itemComp : <p>无数据</p>
            }
        </div>

    )
}
