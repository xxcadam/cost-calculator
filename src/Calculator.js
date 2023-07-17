import React, { useState } from 'react'

export default function Calculator(props) {

    const [proData, setProData] = useState({
        qty: 1,
        sellPrice: 0.0,
    });



    const onChangeQtyHandler = (e) => {
        setProData({
            ...proData,
            qty: e.target.value
        });

    };

    const onChangeSellPriceHandler = (e) => {
        setProData({
            ...proData,
            sellPrice: e.target.value
        });

    };

    const calResult = () => {
        let totalCost = 0.0;
        props.itemData.map((item, index) => {
            if (item.type === "一次性") {
                totalCost += Number(item.price);
            } else {
                totalCost += item.price * proData.qty;
            }
        });

        let splitCost = totalCost / proData.qty;
        let interest = proData.sellPrice - splitCost
        let minInfo = ""
        if (interest <= 0) {
            minInfo = "无法回本,无利润\n"
        } else {
            let min_num_to_sell = Math.ceil(totalCost / proData.sellPrice);
            let sales = min_num_to_sell * proData.sellPrice;
            let maxSales = proData.qty * proData.sellPrice;
            let maxInterest = interest * proData.qty;
            let grossProfitMargin = (maxSales - totalCost) / maxSales;
            let netProfitMargin = maxInterest / maxSales;
            minInfo = `售出${min_num_to_sell}个回本，销售额: ${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(sales)}元。\n` +
                `全部卖出销售额：${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(maxSales)}，`
                + `全部卖出利润：${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(maxInterest)}。\n` +
                `毛利率：${(grossProfitMargin * 100).toFixed(2)}%\n\n`;
                // 净利率：${(netProfitMargin * 100).toFixed(2)}%
                // "毛利率是毛利与销售收入(或营业收入)的百分比,净利率则说明企业收入1块钱能净赚多少钱.";

            
        }


        return `总成本：${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(totalCost)}\n` +
            `平摊成本：${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(splitCost)}, 单个利润：${new Intl.NumberFormat("zh", { style: "currency", currency: "CNY" }).format(interest)}\n` +
            minInfo;
    }

    return (
        <div style={{ margin: "1em 0" }}>
            <div style={{ margin: "1em 0" }}>
                <label>生产数量</label> <input type='number' value={proData.qty} onChange={onChangeQtyHandler} />
                <label>售价</label><input type='number' value={proData.sellPrice} onChange={onChangeSellPriceHandler} />
            </div>
            <div style={{ margin: "1em 0", whiteSpace: "pre-wrap" }}>
                {
                    props.itemData.length === 0 ? "暂无数据" : calResult()
                }

            </div>
        </div>
    )
}
