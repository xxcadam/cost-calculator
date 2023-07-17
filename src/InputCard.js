import React, { useState } from 'react'
import "./App.css"

export default function InputCard(props) {

    const [itemData, setItemData] = useState({
        inputItemName: "",
        inputPrice: 0.0,
        inputType: "一次性"
    });

    const [legal, setLegal] = useState({
        nameEmptyLeagl: false,
        nameExistLegal: false,
    });

    const buttonAvaliable = () => {
        return !(legal.nameEmptyLeagl && legal.nameExistLegal);
    }

    // 创建一个响应函数，监听日期的变化
    const nameChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）

        setItemData({
            ...itemData,
            inputItemName: e.target.value.trim()
        });

        let flag = true
        // 如果输入的值为空，nameEmptyLeagl为false
        if (e.target.value.trim() === "") {
            flag = false;
        }
        if (!props.onCheckRedudant(e.target.value.trim())) {
            setLegal({
                ...legal,
                nameExistLegal: false,
                nameEmptyLeagl: flag
            });
        } else {
            setLegal({
                ...legal,
                nameExistLegal: true,
                nameEmptyLeagl: flag
            });
        }
    };

    // 创建一个响应函数，监听日期的变化
    const priceChangeHandler = (e) => {
        setItemData({
            ...itemData,
            inputPrice: e.target.value
        });
    };

    const typeChangeHandler = (e) => {
        setItemData({
            ...itemData,
            inputType: e.target.value
        });
    };

    const submitItem = () => {

        const newItem = {
            name: itemData.inputItemName,
            price: itemData.inputPrice,
            type: itemData.inputType
        }

        setItemData({
            inputItemName: "",
            inputPrice: 0.0,
            inputType: "一次性"
        });

        setLegal({
            nameEmptyLeagl: false,
            nameExistLegal: false,
        });
        props.onSaveData(newItem);
    }

    const itemNameAlert = () => {
        if (!legal.nameEmptyLeagl) {
            return "类目名不能为空";
        } else if (!legal.nameExistLegal) {
            return "类目已经存在";
        } else {
            return "";
        }

    }

    return (
        <div className="filedRow">

            <p>
                <label>类目名</label>
                <input onChange={nameChangeHandler} value={itemData.inputItemName}></input>
            </p>
            <span className='alert'>{itemNameAlert()}</span>
            <p>
                <label>价格</label>
                <input type="number" onChange={priceChangeHandler} value={itemData.inputPrice}></input>
            </p>

            <p>
                <label>类型</label>
                <select onChange={typeChangeHandler} value={itemData.inputType}>
                    <option value="一次性">一次性</option>
                    <option value="每个">每个</option>
                </select>
            </p>

            <button onClick={submitItem} disabled={buttonAvaliable()}>添加</button>
        </div>

    )
}
