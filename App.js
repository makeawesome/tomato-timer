import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './components/Timer'; // 폴더에서 index.js를 먼저 찾는다. <Timer>는 index.js가 된다.
import reducer from './reducer';
import { createStore } from 'redux';  // Redux store 생성.
import { Provider } from 'react-redux'; // 하위 컴포넌트에 Redux store 전달. <Timer>가 Redux store에 접근 가능하게 함.

let store = createStore(reducer); // reducer.js에서 생성한 reducer()가 실행됨. reducer()는 내부에 정의된 state 리턴.

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Timer />
      </Provider>
    );
  }
}
