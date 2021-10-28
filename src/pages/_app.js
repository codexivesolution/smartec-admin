import Head from 'next/head'
import { Provider, useDispatch } from 'react-redux'
import Layout from '../layouts'
import { useStore } from '../store'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import '../css/tailwind.css'
import '../css/main.css'
import '../css/layouts/layout-1.css'
import '../css/animate.css'
import '../css/components/buttons.css'
import '../css/components/datepicker.css'
import '../css/components/dropdowns.css'
import '../css/components/forms.css'
import '../css/components/left-sidebar-1/styles-lg.css'
import '../css/components/left-sidebar-1/styles-sm.css'
import '../css/components/modals.css'
import '../css/components/navbar.css'
import '../css/components/nprogress.css'
import '../css/components/recharts.css'
import '../css/components/right-sidebar.css'
import '../css/components/sliders.css'
import '../css/components/steps.css'
import '../css/components/tables.css'
import '../css/components/tabs.css'
import '../css/components/user-widgets/widget-2.css'
import '../css/components/user-widgets/widget-4.css'
import AuthStorage from '../helper/AuthStorage'
import { useEffect, useState } from 'react'
import { ApiGet } from '../helper/API/ApiData'
// import { changeLoginState } from '../redux/actions/loginAction'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  // const dispatch = useDispatch()
  const store = useStore(pageProps.initialReduxState)
  const pathname = ["/login", "/Registration", "/memorialview", "/memorialhallstatus",]

  useEffect(() => {
    if (AuthStorage.isUserAuthenticated()) {
      ApiGet("admin/validate")
        .then((res) => {
          // dispatch(changeLoginState(true));
        })
        .catch((error) => {
          AuthStorage.deauthenticateUser();
          router.push("/login");
        });
    }
    else {
      // if (!pathname.includes(location.pathname)) {
        router.push("/login");
      // }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true)
  }, [])

  setTimeout(() => {
    setIsLoading(false)
  }, 50);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        {!IsLoading &&
          <Layout>
            <Component {...pageProps} />
          </Layout>
        }
      </Provider>
    </>
  )
}
