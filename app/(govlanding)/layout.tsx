import Header from "@/components/Header"
import Footer from "@/components/footer"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}
export default AppLayout
