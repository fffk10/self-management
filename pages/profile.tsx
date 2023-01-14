import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../components/layout'

/** props */
export interface ProfileProps {
  user: string
}

/** 
 * Profile page.
 * @param props 
 * @return profile page
 */
export default function Profile(props: ProfileProps) {
  return (
    <Layout>
      Profile
    </Layout>
  )
}

/**
 * Prevent access if not signed in.
 * @param context
 * @return 
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { user: session.user }
  }
}