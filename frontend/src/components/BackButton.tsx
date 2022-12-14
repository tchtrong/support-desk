import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// NOTE: here navigate the user in the history stack for a true 'back' button

const BackButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className="btn btn-reverse btn-back"
      onClick={() => navigate(-1)}
    >
      <FaArrowCircleLeft /> Back
    </button>
  )
}

export default BackButton
