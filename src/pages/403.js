import React from 'react'

import { ForbiddenIcon } from '../icons'

const Page403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pb-10">
      <ForbiddenIcon className="w-12 h-12 text-purple-200" aria-hidden="true" />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">403</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Access Forbidden. Login{' '}
        <a className="text-purple-600 hover:underline dark:text-purple-300" href="/">
          Here
        </a>
        .
      </p>
    </div>
  )
}

export default Page403
