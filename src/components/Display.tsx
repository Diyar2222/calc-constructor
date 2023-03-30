import { useAppSelector } from '../store/store'
interface IDisplay {
  isActive?:boolean
}
const Display = ({isActive}:IDisplay) => {
  const {operator,previousValue,currentValue} = useAppSelector(state=>state.calculator)
  if(isActive){
    return <div className="display">0</div>
  }
    return (
       <div className='display'>
           {previousValue} {operator} {currentValue}
    </div>
  )
}

export default Display