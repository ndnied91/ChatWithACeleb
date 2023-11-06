import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <div className="h-full max-w-5xl mx-auto pt-5 md:pt-10">
      <Component {...pageProps} />
    </div>
  );
}
