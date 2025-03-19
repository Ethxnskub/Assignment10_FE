import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import { Link } from '@mui/material';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu(){
    const session = await getServerSession(authOptions)
    
    return (
        <div className={styles.menucontainer}>
            <div className={styles.rightcontainer}>
            <TopMenuItem title="My Booking" pageRef='/mybooking'/>
            <TopMenuItem title='Venue' pageRef='/venue'/>
            <Link href="/" className={styles.logoimg}><Image src={'/img/logo.png'} className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh' /></Link>
            {
                session? <Link href="api/auth/signout"><div className='absolute top-1/2 left-2 transform -translate-y-1/2 text-cyan-600 text-sm'>Sign-out</div></Link>
                        :<Link href="api/auth/signin"><div className='absolute top-1/2 left-2 transform -translate-y-1/2 text-cyan-600 text-sm'>Sign-In</div></Link>
            }
            </div>
        </div>
    );
}