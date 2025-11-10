# 📊 Barcode Generator Web App

A modern, responsive web application that converts text into downloadable barcodes with multiple size options. Built with React, TypeScript, Vite, and styled with Tailwind CSS.

![Barcode Generator Home Page](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80)

## ✨ Features

- **Real-time Barcode Generation**: Instantly converts text input into barcodes as you type
- **Multiple Size Options**: Choose from predefined sizes (Small, Medium, Large, Extra Large) or create custom dimensions
- **Multiple Export Formats**: Download barcodes in PNG, SVG, and other popular formats
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Modern UI**: Clean interface with smooth transitions and visual feedback
- **Zero Configuration**: Works out of the box with sensible defaults

## 🎯 Barcode Size Options

The application offers flexible sizing options to meet various use cases:

| Size | Dimensions | Best For |
|------|-----------|----------|
| **Small** | 200 x 100 px | Product labels, small tags |
| **Medium** | 400 x 200 px | Standard retail products |
| **Large** | 600 x 300 px | Posters, large packaging |
| **Extra Large** | 800 x 400 px | Banners, warehouse labels |
| **Custom** | User-defined | Specific requirements |

![Barcode Size Comparison](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80)

## 📥 Download Formats

Export your barcodes in multiple formats to suit your needs:

### **PNG (Portable Network Graphics)**
- High-quality raster format
- Perfect for web use and printing
- Supports transparency
- Recommended for most use cases

### **SVG (Scalable Vector Graphics)**
- Infinitely scalable without quality loss
- Ideal for professional printing
- Small file size
- Perfect for responsive designs

### **Additional Formats**
- **JPEG**: Compressed format for smaller file sizes
- **WebP**: Modern format with excellent compression
- **PDF**: Ready-to-print document format

![alt text](images/barcod-home.png "Barcode Home page")
![alt text](images/barcode-1.png "Barcode text is written")
![alt text](images/barcode-2.png "Download Selection")

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd barcode-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 📦 Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **JsBarcode** - Barcode generation library
- **Radix UI** - Accessible component primitives

## 🎨 Project Structure

```
src/
├── components/
│   ├── BarcodeGenerator.tsx    # Main container component
│   ├── BarcodeInput.tsx         # Text input component
│   ├── BarcodePreview.tsx       # Real-time preview display
│   ├── SizeGrid.tsx             # Size selection interface
│   └── ui/                      # Reusable UI components
├── App.tsx                      # Root component
└── main.tsx                     # Application entry point
```

## 💡 Usage

1. **Enter Text**: Type or paste the text you want to convert into a barcode
2. **Preview**: Watch the barcode generate in real-time
3. **Select Size**: Choose from predefined sizes or enter custom dimensions
4. **Download**: Click the download button and select your preferred format (PNG, SVG, etc.)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React + TypeScript + Vite**