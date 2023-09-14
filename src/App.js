import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoFrame from './components/VideoFrame';
import ImageFrame from './components/ImageFrame';

const cv = require('./opencv_480.js');


function App() {


  return (
    <div className="App">
      {/* <header className="App-header">
      </header > */}

      <VideoFrame cv={cv} />
      {/* <ImageFrame cv={cv} /> */}
      {/* <AltVideoFrame cv={cv} /> */}
      {/* <TestInit cv={cv} /> */}
      {/* {BackgroundSubtractor()} */}
      {/* <Test /> */}
    </div >
  );
}

export default App;
