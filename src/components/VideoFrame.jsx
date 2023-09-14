import React, { useEffect, useState, useRef } from 'react';
import { detectSun } from './detectSun';

export default function VideoFrame({ cv = require('../opencv_480.js') }) {

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    useEffect(() => {
        let video = document.getElementById("videoInput"); // video is the id of video tag
        video.width = 640;
        video.height = 480;

        cv['onRuntimeInitialized'] = () => {
            console.log(`OpenCV init done.`)

            // Capture webcam video
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();

                    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
                    let cap = new cv.VideoCapture(video);

                    const FPS = 30;
                    async function processVideo() {
                        try {
                            let begin = Date.now();
                            // start processing.
                            cap.read(src);
                            // processing code:
                            dst = await detectSun(src, cv);
                            cv.imshow("canvasOutput", dst);
                            dst.delete();
                            // schedule the next one.
                            let delay = 1000 / FPS - (Date.now() - begin);
                            setTimeout(processVideo, delay);
                        } catch (err) {
                            console.error(err);
                        }
                    }

                    // schedule the first one.
                    setTimeout(processVideo, 0);
                })
                .catch(function (err) {
                    console.log("An error occurred! " + err);
                });

        };




    }, []);


    return (
        <div style={{ "display": "flex" }}>
            <h1>M3-sun-detector component PoC</h1>
            <video id="videoInput" autoPlay style={{ "width": "1%", "visibility": "hidden" }}></video>
            <canvas style={{ "height": "80vh", "width": "auto" }} id="canvasOutput"></canvas>
        </div >
    );
};

