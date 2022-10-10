import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

// To implement logout link

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  // destructuring some authentication props needed from useAuth
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>RedwoodJS Blog</Link>
          </h1>
          {isAuthenticated ? (
            <div>
              <span>Logged in as {currentUser.email}</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About us</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
