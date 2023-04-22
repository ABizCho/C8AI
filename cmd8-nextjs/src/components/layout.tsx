import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import TERMS from "./terms.json";

const siteTitle = "CMD8";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
      <header>
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="logo-container">
              <Link href="/" className="logo-link">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  height={50}
                  width={50}
                  className="logo-img"
                />
                <h1 className="logo-text">CMD+8</h1>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <footer className="doc-footer">
        <div className="inner_footer ">
          <section className="section_service-list"></section>
          <section className="section_address"></section>
          <section className="section_terms-wrapper">
            {TERMS.map((term, idx) => (
              <a
                key={idx}
                href={term.dest}
                role="button"
                aria-expanded="false"
                className="terms"
              >
                {term.name}
              </a>
            ))}
          </section>
          <ul className="section_social"></ul>
          <small className="txt_copyright">
            © <a href="https://www.cmd8.com">Cmd8</a> All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
