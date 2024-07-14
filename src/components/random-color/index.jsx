import { useEffect, useState } from "react"


export function RandomColor() {

    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState("#000000")

    useEffect(() => {
        if (typeOfColor === "HEX") {
            handleCreateRandomHexColor()
        } else {
            handleCreateRandomRgbColor()
        }
    }, [typeOfColor])

    function randomColorUtility(length) {
        return Math.floor(Math.random() * length)
    }

    function handleCreateRandomHexColor() {
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = "#"
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)]
        }
        setColor(hexColor)
    }

    function handleCreateRandomRgbColor() {
        const r = randomColorUtility(256);
        const g = randomColorUtility(256);
        const b = randomColorUtility(256);

        setColor(`rgb(${r},${g},${b})`);
    }

    return (
        <div className="container" style={{
            height: "100vh",
            width: "100vw",
            background: color,
        }}>
            <button onClick={() => setTypeOfColor("HEX")}>Create HEX Color</button>
            <button onClick={() => setTypeOfColor("RGB")}>Create RGB Color</button>
            <button onClick={() => { typeOfColor === "HEX" ? handleCreateRandomHexColor() : handleCreateRandomRgbColor() }}>Generate Random Color</button>
            <div style={{
                display: "flex",
                marginTop: "50px",
                justifyContent: "center",
                color: "#fff",
                fontSize: "60px",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {typeOfColor === "HEX" ? "HEX Color" : "RGB Color"}
                <h2>{color}</h2>
            </div>
        </div>
    )
}