import { calcAction } from '../store/calcSlice'
import { useAppDispatch, useAppSelector } from '../store/store'

const Signs = () => {
  const dispatch = useAppDispatch()
  const runTimeActive = useAppSelector(state=>state.calculator.runtimeActive)
  return (
    <div className='signs'>
        <button className={`sign ${runTimeActive ? 'buttonDisabled' : ''}`} onClick={()=>dispatch(calcAction.addSign('/'))}>/</button>
        <button className={`sign ${runTimeActive ? 'buttonDisabled' : ''}`} onClick={()=>dispatch(calcAction.addSign('x'))}>x</button>
        <button className={`sign ${runTimeActive ? 'buttonDisabled' : ''}`} onClick={()=>dispatch(calcAction.addSign('-'))}>-</button>
        <button className={`sign ${runTimeActive ? 'buttonDisabled' : ''}`} onClick={()=>dispatch(calcAction.addSign('+'))}>+</button>
    </div>
  )
}

export default Signs