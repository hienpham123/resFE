import './App.css';
import React from 'react';
import {useEffect, useState, memo} from 'react';
const listTabs = ['posts', 'comments', 'albums']
function ListName({onCount}) {
    
    return (
        <React.Fragment>
            <h1>count</h1>
            <button onClick={onCount}>click</button>
        </React.Fragment>
    );
}

export default memo(ListName);
