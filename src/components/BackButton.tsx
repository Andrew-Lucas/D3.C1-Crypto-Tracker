import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { back, isDarkMode } from '../atoms'

const Button = styled.button`
  background-color: transparent !important;
  position: fixed;
  left: 10px;
  top: 10px;
`

function BackButton() {
  const path = useRecoilValue(back)
  const darkMode = useRecoilValue(isDarkMode)
  return (
    <Button>
      <Link to={path}>
        <FontAwesomeIcon
          size="2x"
          color={!darkMode ? 'black' : ''}
          icon={faArrowAltCircleLeft}
        />
      </Link>
    </Button>
  )
}

export default BackButton
