import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css"


export default function ImageSlider({ url, limit = 5, page = 1 }) {
    const [images, setImages] = useState([])
    const [currSlide, setCurrSlide] = useState(0);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false)

    async function fetchImages(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json()
            if (data) {
                setImages(data);
                setLoading(false);
                setErrMsg(null)
            }
        } catch (error) {
            setErrMsg(error.message);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (url) fetchImages(url)
    }, [url])
    if (loading) {
        return (<h2> Loading images! Please wait</h2>)
    }

    if (errMsg) {
        return (<h3>Some error occurred: {errMsg}</h3>)
    }

    function handlePrev() {
        setCurrSlide(currSlide === 0 ? images.length - 1 : currSlide - 1)
    }

    function handleNext() {
        setCurrSlide(currSlide === images.length - 1 ? 0 : currSlide + 1)
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill className="arrow arrow-left" onClick={() => handlePrev()} />
            {images && images.length && images.map((image, idx) => {
                return (
                    <img
                        key={image.id}
                        alt={image.download_url}
                        src={image.download_url}
                        className={idx === currSlide ? "current-image" : "current-image hide-current-image"}
                    />
                )
            })}

            <BsArrowRightCircleFill className="arrow arrow-right" onClick={() => handleNext()} />
            <span className="circle-indicators">
                {
                    images && images.length ?
                        images.map((_, idx) =>
                            <button
                                key={idx}
                                onClick={() => setCurrSlide(idx)}
                                className={idx === currSlide ? "current-indicator" : "current-indicator inactive-current-indicator"} />)
                        : <></>
                }
            </span>
        </div>
    )
}