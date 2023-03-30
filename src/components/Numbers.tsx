import { calcAction } from '../store/calcSlice'
import { useAppDispatch, useAppSelector } from '../store/store'

const Numbers = () => {
  const dispatch = useAppDispatch()
  const runTimeActive = useAppSelector(state=>state.calculator.runtimeActive)
  return (
    <div className='numbers'>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`} onClick={()=>dispatch(calcAction.addDigit('7'))}>7</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('8'))}>8</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('9'))}>9</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('4'))}>4</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('5'))}>5</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('6'))}>6</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('1'))}>1</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('2'))}>2</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('3'))}>3</button>
        <button className={`number zero ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('0'))}>0</button>
        <button className={`number ${runTimeActive ? 'buttonDisabled':''}`}  onClick={()=>dispatch(calcAction.addDigit('.'))}>.</button>
    </div>
  )
}

export default Numbers