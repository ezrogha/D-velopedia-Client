import NavigationBar from './NavigationBar'

export default ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <div className="body">
        {children}
      </div>
      <footer className="bg-dark text-white py-4 mt-5 text-center">
        <span>Copyright &copy; {new Date().getFullYear()} D-velopedia</span>
      </footer>
      <style jsx>{`
        .body {
          min-height: 70vh;
        }
      `}</style>
    </div>
  )
}
