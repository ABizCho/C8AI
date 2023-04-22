import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const name = "horiz.d";
export const siteTitle = "CMD8";

export default function Layout({
  children,
  home, // Boolean home 프롭 : 이미와 제목의 크기를 조절하기 위해 사용
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div
    // className={styles.container}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* 
			메타 태그 : 한 페이지의 content를 설명하기 위해 사용된다.
		  */}
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header
      //   className={styles.header}
      >
        {home ? (
          <>
            <nav className="nav-bar bg-gray-800 py-3">
              <div className="nav-container max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between ">
                <div className="logo-container flex-shrink-0">
                  <Link href="/" className="logo-link flex items-center">
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      height={50}
                      width={50}
                      className="logo-img"
                    />
                    <h1 className="logo-text text-white text-5xl font-morganBold">
                      CMD+8
                    </h1>
                  </Link>
                </div>
              </div>
            </nav>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                // className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2
            // className={utilStyles.headingLg}
            >
              <Link
                href="/"
                //   className={utilStyles.colorInherit}
              >
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {/*
		  Boolean Type home이 false인 경우, Back to home 렌더링
		*/}
      {!home && (
        <div
        // className={styles.backToHome}
        >
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
