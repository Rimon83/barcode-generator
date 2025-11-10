import { Helmet } from 'react-helmet-async';
import BarcodeGenerator from './BarcodeGenerator';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Barcode Generator - Free Online Barcode Maker</title>
        <meta
          name="title"
          content="Barcode Generator - Free Online Barcode Maker"
        />
        <meta
          name="description"
          content="Create professional barcodes instantly with our free online barcode generator. Download in PNG, SVG, and multiple formats. Multiple size options available. Fast, easy, and responsive."
        />
        <meta
          name="keywords"
          content="barcode generator, free barcode maker, create barcode online, barcode download, PNG barcode, SVG barcode, barcode creator, online barcode tool"
        />
        <meta name="author" content="Barcode Generator Team" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="base-url" />
        <meta
          property="og:title"
          content="Barcode Generator - Free Online Barcode Maker"
        />
        <meta
          property="og:description"
          content="Create professional barcodes instantly. Download in PNG, SVG, and multiple formats. Multiple size options available."
        />
        <meta
          property="og:image"
          content="https://unsplash.com/photos/a-bag-full-of-food-sitting-next-to-a-bottle-of-ketchup-UbxqRpTsXkg?w=1200&q=80"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="base-url" />
        <meta
          property="twitter:title"
          content="Barcode Generator - Free Online Barcode Maker"
        />
        <meta
          property="twitter:description"
          content="Create professional barcodes instantly. Download in PNG, SVG, and multiple formats."
        />
        <meta
          property="twitter:image"
          content="/path-to-your-social-image.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="base-url" />
      </Helmet>
      <BarcodeGenerator />
    </>
  );
}

export default Home