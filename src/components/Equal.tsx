import { calcAction } from '../store/calcSlice'
import { useAppDispatch, useAppSelector } from '../store/store'

const Equal = () => {
  const dispatch = useAppDispatch()
  const runTimeActive = useAppSelector(state=>state.calculator.runtimeActive)
  return (
    <div className='operate-btns'>
      <button className={`operate-btns_equal ${runTimeActive ? "buttonDisabled":''}`} onClick={()=>dispatch(calcAction.calculate())}>
          =
      </button>
      <button 
      className={`operate-btns_delete ${runTimeActive ? "buttonDisabled":''}`}
      onClick={()=>dispatch(calcAction.delete())}>
        C
      </button>
      <button 
      className={`operate-btns_clear ${runTimeActive ? "buttonDisabled":''}`}
      onClick={()=>dispatch(calcAction.clear())}>
        AC
      </button>
    </div>
  )
}

export default Equal