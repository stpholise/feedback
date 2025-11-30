
import Image from 'next/image'

const Header = () => {
  return (
    <div className='bg-white py-4 w-full px-8'>
        <Image src="/logo-main.png" alt='logo' width={97} height={56} />
    </div>
  )
}

export default Header