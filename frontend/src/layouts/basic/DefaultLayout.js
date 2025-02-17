import { Outlet } from 'react-router-dom'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

const DefaultLayout = () => {
  return (
    <div className='wrraper'>
      <div className='header'>
        <Header/>
      </div>
      <div className='default-layout'>
        <div className='default-layout-con'>
          <Outlet/>
        </div>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default DefaultLayout