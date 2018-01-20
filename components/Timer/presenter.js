import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from "../Button";

function formatTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    return (minutes < 10 ? ('0' + String(minutes)) : String(minutes)) + ':' +
           (seconds < 10 ? ('0' + String(seconds)) : String(seconds));
}

export default class Timer extends Component{
    componentWillReceiveProps(nextProps){ // props를 얻을 때마다 실행됨
        const currentProps = this.props;
        
        if(!currentProps.isPlaying && nextProps.isPlaying){
            // start the interval
            const timerInterval = setInterval(() => {
                currentProps.addSecond();
            }, 1000);

            console.log("timerInterval() set!");

            this.setState({     // Redux store의 state가 아닌 class Timer의 state.
                timerInterval,
            });
        } else if(currentProps.isPlaying && !nextProps.isPlaying) {
            // stop the interval
            clearInterval(this.state.timerInterval);
        }
    }

    // 버튼 누르면 action이 실행되어 Redux store에 저장된 state가 변경된다.
    // React는 state가 변경되면 render()를 실행한다.
    render(){
        console.log(this.props);
        const actionCreators = { 
            isPlaying, 
            elapsedTime, 
            timerDuration,
            startTimer,
            restartTimer,
            addSecond, 
        } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"}/>
                <View style={styles.upper}>
                    <Text style={styles.time}>{formatTime(timerDuration - elapsedTime)}</Text>
                </View>
                <View style={styles.lower}>
                    { !isPlaying && <Button iconName="play-circle" onPress={startTimer} /> }
                    { isPlaying && <Button iconName="stop-circle" onPress={restartTimer} /> }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CE0B24",
    },
    upper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    lower: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        color: "white",
        fontSize: 120,
        fontWeight: "100",
    },
});