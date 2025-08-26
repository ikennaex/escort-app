import React from 'react'

const menu = [
    {
        icon: '🏠',
        title: 'Home',
        path: '/'
    },
    {
        icon: '👤',
        title: 'Profile',
        path: '/profile'
    },
    {
        icon: '⚙️',
        title: 'Settings',
        path: '/settings'
    },
    {
        icon: '🚪',
        title: 'Logout',
        path: '/logout'
    }
]

const SlideNavbar = () => {
  return (
    <div className='bg-customGray h-screen w-60 fixed top-0 left-0 pt-24'>
      <h2 className='text-white text-lg font-bold p-4'>Menu</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.title} className='text-white p-4 hover:bg-customPink'>
            {item.icon} {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SlideNavbar