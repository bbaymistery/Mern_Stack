import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

export default function ResultTable() {

    const [data, setData] = useState([])

    useEffect(() => {
        let url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`
        getServerData(url, (res) => { setData(res) })
    })

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attemps</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {!data ?? <div>No Data Found </div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td style={{ color: `${v?.achived === "Passed" ? "red" : 'green'}` }}>{v?.achived || ""}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}