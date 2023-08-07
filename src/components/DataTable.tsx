import { Table } from 'react-bootstrap';

type DataTableProps = {
    headers: string[],
    cells: JSX.Element[]
}

export const DataTable = ({ headers, cells }: DataTableProps) => {
    return <Table  className='my-5' striped bordered hover variant="dark" data-bs-theme="dark">
        <thead>
            <tr>
                {headers.map((item,index)=>{
                    return <th key={`header-${index}`}>{item}</th>
                })}
            </tr>
        </thead>
        <tbody>
                {cells}
        </tbody>
    </Table>
}