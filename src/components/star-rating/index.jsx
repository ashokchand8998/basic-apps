import { useState } from "react"
import { FaStar } from "react-icons/fa"
import "./styles.css"


export default function StarRating({ noOfStars = 5 }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(idx) {
        setRating(idx)
    }

    function handleHover(idx) {
        setHover(idx)
    }

    function hanldeMouseLeave() {
        setHover(rating)
    }

    return (<>
        <div className="star-rating">
            {[...Array(noOfStars)].map((_, index) => {
                return <FaStar
                    className={index <= (hover || rating) ? "active" : "inactive"}
                    key={index}
                    onClick={() => handleClick(index)}
                    onMouseMove={() => handleHover(index)}
                    onMouseLeave={() => hanldeMouseLeave()}
                    size={40}
                />
            })}
        </div>
    </>)
}