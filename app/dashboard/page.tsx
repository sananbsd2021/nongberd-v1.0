import RightDashboardPage from './RightDashboard'
import MenuListPage from '@/components/leftMenulist'

const DashboardPage = () => {
  return (
    // <div>
    // </div>
    <div className="min-h-screen flex flex-col md:flex-row required:xl">
    <div className="w-full md:w-2/6 p-4">
      <MenuListPage />
    </div>
    <div className="md:w-4/6 p-4">
      <RightDashboardPage />
    </div>
  </div>
  )
}

export default DashboardPage
