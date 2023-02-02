import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import { useSelector } from 'react-redux'

const generatePage = (pageName) => {
    //pages icinde register login falan var
    //ona gore .. seklinde yazdik
    const component = () => require(`../pages/${pageName}`).default
    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const { page, id } = useParams()
    const { auth } = useSelector(state => state)

    let pageName = "";
    //token statementini yazmasag  bu sehfeye gede bilerik http://localhost:3000/discover
    ///tokeni yazarakk gedisi engelliyirik
    //yani sadece login olanlar gede bilir
    //Bunu bura ekledikden sonra App js e register ucun ilave route ekledik
    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`
        } else {
            pageName = `${page}`
        }
    }

    return generatePage(pageName)
}

export default PageRender