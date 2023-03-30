import { createSlice } from "@reduxjs/toolkit"
interface IDrag {
    part:string;
    link:JSX.Element
  }
interface ICalculator {
    runtimeActive:boolean;
    currentValue:string;
    previousValue:string;
    operator:string;
    board:IDrag[];
    boardNotFull:boolean;
    maxDisplayLength:number
}
const initialState:ICalculator = {
    runtimeActive:true,
    board:[],
    currentValue:'0',
    previousValue:'',
    operator:'',
    boardNotFull:false,
    maxDisplayLength:12
}
export const calcSlice = createSlice({
    name:'calculator',
    initialState,
    reducers:{
        setBoard:(state,action)=>{
            state.board = action.payload
        },
        setBoardNotFull:(state)=>{
            state.boardNotFull =!state.boardNotFull
        },
        setRuntime:(state)=>{
            if(state.board.length===4){
                state.runtimeActive = !state.runtimeActive
                state.currentValue = '0'
                state.operator = ''
                state.previousValue = ''
            }
            if(state.board.length!==4){
                state.boardNotFull = true
            }
        },
        addDigit:(state,action)=>{
            const length = state.previousValue.length+state.operator.length+state.currentValue.length
            if(length>state.maxDisplayLength) return 
            const digit = action.payload
            if(state.currentValue.includes('.') && action.payload==='.') return 
            if (state.currentValue === '0') {
                state.currentValue = digit;
            } else {
              state.currentValue += digit;
            }
        },
        addSign:(state,action)=>{
            if (state.currentValue === '0' || state.currentValue==='-') return 
            const length = state.previousValue.length+state.operator.length+state.currentValue.length
            if(length>state.maxDisplayLength) return 
            const newOperator = action.payload;
            if(state.operator && state.currentValue === '') {
                if(newOperator==='-'){
                    state.currentValue = '-'+state.currentValue
                } else {
                    state.operator = newOperator;
                }
            } else if(state.currentValue==='0' && newOperator==='-') {
                state.currentValue = '-'
            } else {
                state.previousValue = state.currentValue;
                state.currentValue = '';
                state.operator = newOperator;
            }
        },
        calculate:(state)=>{
            const currentValue = state.currentValue;
            const previousValue = state.previousValue
            switch (state.operator) {
                case '+':
                  state.currentValue = (Number(previousValue) + Number(currentValue)).toString();
                  break;
                case '-':
                  state.currentValue = (Number(previousValue) - Number(currentValue)).toString()
                  break;
                case 'x':
                  state.currentValue = (Number(previousValue) * Number(currentValue)).toString()
                  break;
                case '/':
                  state.currentValue = (Number(previousValue) / Number(currentValue)).toString()
                  break;
              }

            if(state.currentValue.length>14){
                state.currentValue = state.currentValue.slice(0,14)
            }
              state.operator = ''
              state.previousValue = ''

        },
        clear:(state)=>{
            state.operator = ''
            state.previousValue = ''
            state.currentValue = '0'
        },
        delete:(state)=>{
            if(state.currentValue !=''){
                state.currentValue = state.currentValue.slice(0,-1)
            } else if(state.operator!==''){
                state.operator = ''
            } else if(state.previousValue!==''){
                state.previousValue = state.previousValue.slice(0,-1)
            } 
            if(state.currentValue.length === 0 && state.operator === '' && state.previousValue === '') {
                state.currentValue = '0';
            }
        }

    }
})
export default calcSlice.reducer
export const calcAction = calcSlice.actions
