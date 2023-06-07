import Head from 'next/head';
import Link from 'next/link';


export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>        
        <nav>
          <Link href="/">
            Back to Main Screen
          </Link>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
