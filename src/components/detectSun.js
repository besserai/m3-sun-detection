import { useEffect, useState } from 'react';
// const cv = require('../opencv_480.js');
const imgSrc = 'Sun-in-the-sky.jpg';

export async function detectSun(inputMat, cv = require('../opencv_480.js')) {
    // The function takes a cv.Mat object (Image) and detects the brightest spot
    // (hopefully the sun) and draws a circle around it. 
    // Pass the loaded OpenCV.js as cv, otherwise it tries to load it.

    let procMat = inputMat.clone();
    let imgWithSunDetected = inputMat.clone();

    // convert to grayscale and use tresholding for detection
    cv.cvtColor(procMat, procMat, cv.COLOR_RGBA2GRAY, 0);
    cv.GaussianBlur(procMat, procMat, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT);
    cv.threshold(procMat, procMat, 254, 255, cv.THRESH_BINARY);
    let m = cv.moments(procMat, true);

    // paint circle around sun
    let sunPos = new cv.Point(m.m10 / m.m00, m.m01 / m.m00);
    if (isNaN(sunPos.x) || isNaN(sunPos.y)) {
        // console.warn("No sun detected in image!");
    } else {
        // console.log(sunPos);
        const circleColor = new cv.Scalar(200, 0, 0, 255);
        cv.circle(imgWithSunDetected, sunPos, 10, circleColor, 3);
    }

    procMat.delete();

    return imgWithSunDetected;
}