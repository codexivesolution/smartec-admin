import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { FiSettings, FiMenu } from 'react-icons/fi'
import Dropdown1 from './dropdown-1'
import Dropdown2 from './dropdown-2'
import Dropdown3 from './dropdown-3'
import Dropdown4 from './dropdown-4'
import Dropdown5 from './dropdown-5'
import Dropdown6 from './dropdown-6'
import Search from './search'
import AuthStorage from '../../helper/AuthStorage'
import { changeLoginState } from '../../redux/actions/loginAction'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const { config } = useSelector(
    state => ({
      config: state.config
    }),
    shallowEqual
  )
  let { rightSidebar, collapsed } = { ...config }
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(changeLoginState(false));
    AuthStorage.deauthenticateUser();
    router.push("/login");
  }

  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG_KEY',
              key: 'collapsed',
              value: !collapsed
            })
          }
          className="mx-4">
          <FiMenu size={20} />
        </button>
        {/* <Search /> */}

        <span className="ml-auto"></span>
        <Dropdown6 />
        <Dropdown2 />
        {/* <Dropdown1 /> */}
        {/* <Dropdown4 /> */}
        {/* <Dropdown3 /> */}
        {/* <Dropdown5 /> */}
        <p onClick={logout}>로그아웃</p>
        {/* <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG_KEY',
              key: 'rightSidebar',
              value: !rightSidebar
            })
          }>
          <FiSettings size={18} />
        </button> */}

      </div>
    </div>
  )
}

export default Navbar
