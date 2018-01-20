import { connect } from 'react-redux'; // 컴포넌트와 Redux store를 연결.
import { bindActionCreators } from 'redux'; // action 연결
import Timer from './presenter';
import { actionCreators as tomatoActions } from '../../reducer';

function mapStateToProps(state){
    const { isPlaying, elapsedTime, timerDuration } = state;
    return {
        isPlaying,
        elapsedTime,
        timerDuration,
    }
}

function mapDispatchToProps(dispatch){
    // dispatch는 action을 reducer로 보내는 function.
    return {
        startTimer: bindActionCreators(tomatoActions.startTimer, dispatch),
        restartTimer: bindActionCreators(tomatoActions.restartTimer, dispatch),
        addSecond: bindActionCreators(tomatoActions.addSecond, dispatch),
    }
}

// mapStateToProps(), mapDispatchToProps()의 리턴값을 presenter.js에 구현된 Timer의 'props'로 전달.
export default connect(mapStateToProps, mapDispatchToProps)(Timer);