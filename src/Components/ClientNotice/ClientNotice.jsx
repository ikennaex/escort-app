import React from 'react'

const ClientNotice = () => {
  return (
<div className=" text-white flex flex-col items-center p-4 rounded-lg shadow-md max-w-xl mx-auto">
  <h2 className="flex items-center gap-2 font-bold text-lg">
    <span className="text-2xl">🚨</span> Client Notice
  </h2>
  <p className="mt-2 text-sm">To protect all users and ensure trusted experiences:</p>
  <ul className="mt-3 space-y-2 text-sm">
    <li className="flex items-start gap-2">
      <span>✅</span>
      <span>Please confirm all users with a video call.</span>
    </li>
    <li className="flex items-start gap-2">
      <span>🚗</span>
      <span>Provide transportation fare upfront before any meet.</span>
    </li>
    <li className="flex items-start gap-2">
      <span>⚠️</span>
      <span>Report any suspicious profiles immediately.</span>
    </li>
  </ul>
</div>

  )
}

export default ClientNotice