import InputCard from "./InputCard";
import { useState } from "react";
import ItemCard from "./ItemCard";
import Calculator from "./Calculator";

function App() {

  const [itemData, setItemData] = useState([]);

  const saveItemHandler = (newData) => {
    // 向新的日志中添加id
    newData.id = Date.now() + '';

    // 将新的数据添加到数组
    setItemData([newData, ...itemData]);

  };

  const deletItemHandler = (index) => {
    setItemData(prevState => {
      const newData = [...prevState];
      newData.splice(index, 1);
      return newData;
    });

  }



  const checkItemExisting = (searchName) => {
    const result = itemData.filter((e) => {
      return e.name === searchName
    });
    // 如果有重复return false
    return result.length  === 0;
  };





  return (
    <div>
      <h1>卡皮扒拉成本利润计算器</h1>
      <InputCard onCheckRedudant={checkItemExisting} onSaveData={saveItemHandler}></InputCard>
      <ItemCard itemData={itemData} onDelData={deletItemHandler}></ItemCard>
      <Calculator itemData={itemData} ></Calculator>
    </div>
  );
}

export default App;
