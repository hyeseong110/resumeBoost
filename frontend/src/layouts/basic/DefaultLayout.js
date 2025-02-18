import { Outlet } from 'react-router-dom'
import Header from '../../components/basic/Header'
import Footer from '../../components/basic/Footer'

const DefaultLayout = () => {
  return (
    <div className='wrraper'>
      <Header/>
      <div className='default-layout'>
        <div className='default-layout-con'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default DefaultLayout