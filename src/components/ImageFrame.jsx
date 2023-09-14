// This component tests OpenCV loading and processes an image for testing
import { useEffect, useState } from 'react';
import { detectSun } from './detectSun.js';
// const cv = require('../opencv_480.js');
const imgSrc = 'Sun-in-the-sky.jpg';

export default function ImageFrame({ cv = require('../opencv_480.js') }) {

    const [cvLoaded, setCvLoaded] = useState(false);
    const [count, setCount] = useState(0);


    const DisplayVersion = () => {
        let ocv_ver = "null";

        try {
            ocv_ver = cv.getBuildInformation().split(" ")[4];
            console.log(ocv_ver);
            setCvLoaded(true);
        }
        catch (err) {
            console.warn(`getBuildInformation failed: ${err.message}`)
            ocv_ver = "unknown";
        }

    }

    const onClick = () => {
        setCount((oldCount) => oldCount + 1);
    }

    // test effect
    useEffect(() => {
        DisplayVersion();
        console.log("effect ran")
    }, [count])

    // load the img into canvas when load finished
    useEffect(() => {
        if (cvLoaded) {
            const imgIn = document.getElementById("img-in");

            let mat = cv.imread(imgIn);

            detectSun(mat, cv).then(
                (outImg) => {
                    console.log("sun detector ran");
                    cv.imshow("img-out1", outImg);
                }
            );


        }
    }, [count]);

    const handleFileUploaded = async (e) => {
        console.log(e.target.files[0]);
        const imgIn = document.getElementById("img-in");
        imgIn.src = URL.createObjectURL(e.target.files[0]);
        onClick();
    }

    return (
        <div style={{ width: '300px', height: '300px' }} >

            <div style={{ "display": "flex" }}>
                <img style={{ "height": "300px", "width": "auto", "hidden": "true" }} id="img-in" src={imgSrc}></img>
                <canvas style={{ "height": "300px", "width": "auto" }} id="img-out1"></canvas>
                <canvas style={{ "height": "30%", "width": "30%" }} id="img-out2"></canvas>
            </div>
            {/* <p id="status">test</p> */}
            {/* <p>count: {count}</p> */}
            <input id='fileUpload' type='file' onChange={handleFileUploaded}></input>
            <button onClick={onClick}>refresh</button>

        </div >
    )
}
