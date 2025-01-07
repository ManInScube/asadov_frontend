import { ReactElement } from "react"
import Header from "../modules/HeaderNew/Header"
import Footer from "../modules/Footer/Footer"

interface ILayoutProps{
    children: ReactElement
}
const Layout = ({children}:ILayoutProps) =>{
    return(
        <>
            <Header/>
                <div className="container">
                    {children}
                </div>
            <Footer/>
        </>

    )
}

export default Layout