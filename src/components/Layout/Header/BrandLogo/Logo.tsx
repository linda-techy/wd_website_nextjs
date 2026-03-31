import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <>
      <Image
        src={'/images/header/dark-logo.svg'}
        alt='logo'
        width={150}
        height={68}
        unoptimized={true}
        style={{ width: 'auto', height: 'auto' }}
        className='dark:hidden'
      />
      <Image
        src={'/images/header/logo.svg'}
        alt='logo'
        width={150}
        height={68}
        unoptimized={true}
        style={{ width: 'auto', height: 'auto' }}
        className='dark:block hidden'
      />
    </>
  )
}

export default Logo
