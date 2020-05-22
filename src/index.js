import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const postsData = [
    {id: 1, post: "Hi! how are you?", likesCount: 12},
    {id: 2, post: "It's my first post!", likesCount: 7},
    {id: 3, post: "It's awesome!", likesCount:25 },
];

const dialogsData = [
    {id: 1, name: "Aman"},
    {id: 2, name: "Aigerim"},
    {id: 3, name: "Sultan"},
    {id: 4, name: "Aiganym"},
    {id: 5, name: "Makhambet"},
];

const messages = [
    {id: 1, message: "Hi!"},
    {id: 2, message: "Hello there!"},
    {id: 3, message: "How are you?"},
    {id: 4, message: "Yo!"},
    {id: 5, message: "Everything cools!"},
];

ReactDOM.render(<App postsData={postsData} dialogsData={dialogsData} messages={messages}/>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
