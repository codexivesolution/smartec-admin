import {
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiCompass,
  FiHelpCircle,
  FiShoppingCart,
  FiHome
} from 'react-icons/fi'

const initialState = [
  {
    items: [
      {
        url: '/',
        icon: <FiActivity size={20} />,
        title: '기본 설정',
        items: [
          {
            url: '/dashboard',
            title: '사용자 관리',
            items: []
          }
        ]
      },
    ]
  },
  {
    items: [
      {
        url: '/',
        icon: <FiActivity size={20} />,
        title: '회사 정보 관리',
        items: [
          {
            url: '/',
            title: '연혁 관리',
            items: []
          },
          {
            url: '/',
            title: '연구 개발 관리',
            items: []
          },
          {
            url: '/',
            title: '투자 정보',
            items: []
          }
        ]
      },
    ]
  },
  {
    items: [
      {
        url: '/',
        icon: <FiActivity size={20} />,
        title: '자료 관리',
        items: [
          {
            url: '/',
            title: '데이터 사이언스',
            items: []
          },
          {
            url: '/',
            title: '스마트 지방간 케어',
            items: []
          }
        ]
      },
    ]
  }
]

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
