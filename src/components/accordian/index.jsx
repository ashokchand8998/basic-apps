import { useState } from "react";
import data from "./data";
import "./styles.css"

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [multiSelction, setMultiSelction] = useState(false)
    const [multiSelected, setMultiSelected] = useState([])

    function handleSingleSelection(currId) {
        setSelected(currId === selected ? null : currId)
    }

    function handleMultiSelection(currId) {
        let _multiSelected = [...multiSelected]
        const findIdx = _multiSelected.indexOf(currId);
        if (findIdx > -1) {
            _multiSelected.splice(findIdx, 1)
        } else {
            _multiSelected.push(currId)
        }
        setMultiSelected(_multiSelected)
    }

    return (
        <div className="wrapper">
            <button onClick={() => setMultiSelction(!multiSelction)}>Enable multi selection</button>
            <div className="accordian">
                {
                    data && data.length > 0 ?
                        data.map(dataItem =>
                            <div key={dataItem.id} className="item" >
                                <div className="title" onClick={() => multiSelction ? handleMultiSelection(dataItem.id) : handleSingleSelection(dataItem.id)}>
                                    <h3>{dataItem.question}</h3>
                                    <span>+</span>
                                </div>
                                {
                                    (multiSelction ? multiSelected.indexOf(dataItem.id) > -1 : selected === dataItem.id) ?
                                        <div className="content">{dataItem.answer}</div> : <></>
                                }
                            </div>
                        ) :
                        <></>
                }
            </div>
        </div>
    )
}