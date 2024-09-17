import { useState } from 'react'
import './App.css'
import ParentChildDataGrid from './DataGrid'
import TreeDataSimple1 from './DataGridDemo'
import TableData from './Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ParentChildDataGrid></ParentChildDataGrid>
    {/* <TableData></TableData> */}
    {/* <TreeDataSimple1></TreeDataSimple1> */}
    </>
  )
}

export default App
