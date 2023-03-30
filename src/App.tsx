import Display from "./components/Display";
import Equal from "./components/Equal";
import Numbers from "./components/Numbers";
import Signs from "./components/Signs";
import {AiOutlineEye} from 'react-icons/ai'
import {CgArrowsH} from 'react-icons/cg'
import {BiImageAdd} from 'react-icons/bi'
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { calcAction } from "./store/calcSlice";
interface IDrag {
  part:string;
  link:JSX.Element
}
function App() {
  const dispatch = useAppDispatch()
  const {runtimeActive,board,boardNotFull} = useAppSelector(state=>state.calculator)
  const [isDragging,setIsDragging] = useState(false)
  const [currentDrag,setCurrentDrag] = useState<IDrag>()
  const [dragOver,setDragOver] = useState<IDrag | null>()
  useEffect(()=>{
    if(board.length===4 && boardNotFull){
      dispatch(calcAction.setBoardNotFull())
    }
  },[board])
  const initialList = [{
    part:'display',
    link:<Display/>
  },
  {
    part:'signs',
    link:<Signs/>
  },
  {
    part:'numbers',
    link:<Numbers/>
  },
  {
    part:'equals',
    link:<Equal/>
  }
  ]
  const ConstructorDragAndDropFunctions = {
    onDragOver:(e:React.DragEvent<HTMLDivElement>,item:IDrag)=>{
      e.preventDefault()
      setDragOver(item)
      e.currentTarget.style.borderTop = '2px solid blue'
    },
    onDragLeave:(e:React.DragEvent<HTMLDivElement>)=>{
      e.currentTarget.style.borderTop = '0px'
      setDragOver(null) 
    },
    onDrop:(e:React.DragEvent<HTMLDivElement>,item:IDrag)=>{
      e.preventDefault()
      setCurrentDrag(item)
      if(currentDrag && dragOver){
        const currentDragIndex = board.findIndex(item=>item.part===currentDrag.part)
        const dragOverIndex = board.findIndex(item=>item.part===dragOver.part)
        const newBoard = [...board];
        newBoard.splice(currentDragIndex,1)
        newBoard.splice(dragOverIndex,0,currentDrag)
        dispatch(calcAction.setBoard(newBoard))
      }
      e.currentTarget.style.borderTop = '0px'
    }
  }
  const DragAndDropFunctions = {
    onDrag:(e:React.DragEvent,item:IDrag)=>{
      e.preventDefault()
      setCurrentDrag(item)
    },
    onDragOver:(e:React.DragEvent<HTMLDivElement>)=>{
      e.preventDefault()
      setIsDragging(true)
    },
    onDragLeave:(e:React.DragEvent<HTMLDivElement>)=>{
      setIsDragging(false)
    },
    onDrop:(e:React.DragEvent<HTMLDivElement>)=>{
      e.preventDefault()
      setIsDragging(false)
      if(currentDrag){
        const itemAlreadyExists = board.find(item => item.part === currentDrag.part);
        if(itemAlreadyExists) return 
        if(currentDrag.part==='display'){
          dispatch(calcAction.setBoard([currentDrag,...board]))
        } else {
          if(dragOver){
            const dragOverIndex = board.findIndex(item=>item.part===dragOver.part)
            const newBoard = [...board]
            let temp = newBoard[dragOverIndex]
            newBoard.splice(dragOverIndex,1,currentDrag)
            newBoard.splice(dragOverIndex+1,0,temp)
            dispatch(calcAction.setBoard(newBoard));
            setDragOver(null)
          } else {
            dispatch(calcAction.setBoard([...board,currentDrag]));
          }
        }
      }
    }
  }
  function filterItems(item:IDrag){
    if(runtimeActive){
      dispatch(calcAction.setBoard(board.filter(boardItem=>boardItem.part!==item.part)))
    }
  }
  return (
    <div className="App">
      <div className="switch">
        {boardNotFull && <div className="warning">Calculator constructor is not full</div>}
        <div className={`back ${runtimeActive?"active":""}`}></div>
        <div className='switch_runtime'
                onClick = {()=>dispatch(calcAction.setRuntime())}>
          <AiOutlineEye style={{color:!runtimeActive?'#5D5FEF':''}}/>Runtime
        </div>
        <div className='switch_constructor'
        onClick = {()=>dispatch(calcAction.setRuntime())}>
          <CgArrowsH style={{color:runtimeActive?'#5D5FEF':''}}/>Constructor
        </div>
      </div>
      <div className="container">
        <div className="container_left">
          {initialList.map(item=>{
            const onBoard = board.some(boardItem=>boardItem.part===item.part)
            if(item.part==='display'){
              return <div 
              key={item.part}
              draggable={runtimeActive} 
              onDrag={(e)=>DragAndDropFunctions.onDrag(e,item)}
              style={{opacity:onBoard ? '0.5' : '1',pointerEvents:onBoard ? 'none':'auto'}}
              >
                <Display isActive={onBoard}/>
                     </div>
            }
            return <div 
            key={item.part}
            style={{opacity:onBoard ? '0.5' : '1',pointerEvents:onBoard ? 'none':'auto'}}
            onDrag={(e)=>DragAndDropFunctions.onDrag(e,item)}
            draggable = {runtimeActive}>{item.link}</div>
          })}
        </div>
        <div onDragOver={(e)=>DragAndDropFunctions.onDragOver(e)}
                onDrop={DragAndDropFunctions.onDrop}
                onDragLeave={DragAndDropFunctions.onDragLeave}
                className={`container_right`}>
          {board.length>0 
          ? board.map(item=>{
            if(item.part==='display'){
              return <div 
              onDoubleClick={()=>filterItems(item)}
              key={item.part} className="constructor_display">{item.link}</div>
            }
            return <div key={item.part} draggable = {runtimeActive}
            onDoubleClick={()=>filterItems(item)}
            onDrag={(e)=>DragAndDropFunctions.onDrag(e,item)}
            onDragOver={(e)=>ConstructorDragAndDropFunctions.onDragOver(e,item)}
            onDragLeave={ConstructorDragAndDropFunctions.onDragLeave}
            onDrop={(e)=>ConstructorDragAndDropFunctions.onDrop(e,item)}
            >{item.link}</div>
            })
          : <div className={`container_right_empty ${isDragging ? 'isDragging' : ''}`}>
                <BiImageAdd style={{fontSize:'30px'}}/>
                <span className="violet">Перетащите сюда</span> 
                <span className="constructor_text">любой элемент</span>
                <span className="constructor_text">из левой панели</span>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
