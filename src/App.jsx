import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  Sun, 
  Palette, 
  Type, 
  CheckCircle, 
  XCircle, 
  Maximize, 
  Layout,
  Download,
  Info,
  Coffee,
  FileText,
  CreditCard,
  Globe,
  Building2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

const App = () => {
  const [activeTab, setActiveTab] = useState('philosophy');
  const contentRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const brandData = {
    name: "PT. Lentera Sastra Loka",
    tagline: "Menyinari Alam dengan Ilmu",
    colors: [
      { name: "Lentera (Orange)", hex: "#ff8c00", desc: "Mewakili semangat 'Lentera' yang hangat dan dinamis." },
      { name: "Sastra (Yellow S)", hex: "#ffc300", desc: "Warna inti untuk 'Sastra', melambangkan kejernihan karya." },
      { name: "Loka (Bright Yellow)", hex: "#ffd400", desc: "Mewakili 'Loka' atau alam semesta yang terang oleh ilmu." },
      { name: "Corporate Earth", hex: "#5f5421", desc: "Warna tipografi utama yang melambangkan kebijaksanaan dan landasan etika." }
    ],
    typography: {
      primary: "Skia",
      style: "Humanist Sans-Serif",
      characteristics: "Eksklusif, Artistik, Terbuka, dan Modern"
    }
  };

  const sections = [
    { id: 'philosophy', label: 'Filosofi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'colors', label: 'Warna', icon: <Palette className="w-5 h-5" /> },
    { id: 'typography', label: 'Tipografi', icon: <Type className="w-5 h-5" /> },
    { id: 'usage', label: 'Aturan Pakai', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'mockup', label: 'Aplikasi', icon: <Layout className="w-5 h-5" /> }
  ];

  const LogoIcon = ({ className = "w-32 h-32" }) => (
    <img src="/logo.png" alt="Logo Lentera Sastra Loka" className={className} />
  );

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const prevTab = activeTab;
    const allTabs = ['philosophy', 'colors', 'typography', 'usage', 'mockup'];
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    let firstPage = true;

    for (const tab of allTabs) {
      setActiveTab(tab);
      await new Promise(resolve => setTimeout(resolve, 300));

      if (contentRef.current) {
        const canvas = await html2canvas(contentRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (!firstPage) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        firstPage = false;
      }
    }

    setActiveTab(prevTab);
    pdf.save('Brand-Guidelines-Lentera-Sastra-Loka.pdf');
    setIsDownloading(false);
  };

  const applications = [
    {
      title: "Mug",
      icon: <Coffee className="w-6 h-6" />,
      rule: "Logo dicetak di sisi tengah dengan jarak aman 2cm dari bibir gelas.",
      preview: (
        <img src="/mug.png" alt="Mockup Mug" className="max-w-full max-h-full object-contain rounded-lg" />
      )
    },
    {
      title: "Kop Surat",
      icon: <FileText className="w-6 h-6" />,
      rule: "Logo diletakkan di pojok kiri atas. Alamat menggunakan warna Corporate Earth di bagian bawah.",
      preview: (
        <img src="/kop-surat.png" alt="Mockup Kop Surat" className="max-w-full max-h-full object-contain rounded-lg" />
      )
    },
    {
      title: "Kartu Nama",
      icon: <CreditCard className="w-6 h-6" />,
      rule: "Sisi depan hanya berisi logo (minimalis). Sisi belakang berisi data diri dengan font Skia.",
      preview: (
        <img src="/kartu-nama.png" alt="Mockup Kartu Nama" className="max-w-full max-h-full object-contain rounded-lg" />
      )
    },
    {
      title: "Website",
      icon: <Globe className="w-6 h-6" />,
      rule: "Logo diletakkan di kiri navigasi (sticky header). Favicon menggunakan simbol Loka (kuning).",
      preview: (
        <img src="/website.png" alt="Mockup Website" className="max-w-full max-h-full object-contain rounded-lg" />
      )
    },
    {
      title: "Gedung Kantor",
      icon: <Building2 className="w-6 h-6" />,
      rule: "Signage menggunakan material akrilik timbul dengan pencahayaan LED warm-white dari belakang.",
      preview: (
        <img src="/gedung.png" alt="Mockup Gedung Kantor" className="max-w-full max-h-full object-contain rounded-lg" />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: "'Skia', 'Inter', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <LogoIcon className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight" style={{ color: brandData.colors[3].hex }}>{brandData.name}</h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em]">BRAND IDENTITY SYSTEM v1.4</p>
            </div>
          </div>
          {/* <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all shadow-sm hover:opacity-90 disabled:opacity-50" 
            style={{ backgroundColor: brandData.colors[3].hex }}
          >
            <Download className="w-4 h-4" /> 
            {isDownloading ? 'Generating PDF...' : 'Download Guidelines'}
          </button> */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Navigation */}
          <nav className="lg:col-span-1 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 px-4 uppercase tracking-widest mb-4">Master Menu</p>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === sec.id 
                    ? 'bg-white shadow-xl scale-[1.02]' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
                style={activeTab === sec.id ? { color: brandData.colors[0].hex } : {}}
              >
                <span className={activeTab === sec.id ? '' : 'text-slate-400'}>
                  {sec.icon}
                </span>
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div ref={contentRef} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10 min-h-[650px] relative">
              
              {activeTab === 'philosophy' && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
                  <div className="flex flex-col items-center mb-16">
                    <div className="p-10 bg-slate-50 rounded-[3rem] mb-8 border border-slate-100 shadow-inner">
                      <LogoIcon className="w-56 h-56 drop-shadow-2xl" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Filosofi Konstruksi</h2>
                    <p className="text-slate-500 max-w-lg leading-relaxed italic">
                      "Lentera yang menyinari alam dengan ilmu."
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50">
                      <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-white mb-4 shadow-sm" style={{ backgroundColor: brandData.colors[0].hex }}>L</div>
                      <h4 className="font-bold text-sm mb-1">Lentera</h4>
                      <p className="text-[10px] text-slate-500">Awal pencerahan.</p>
                    </div>
                    <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50">
                      <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-white mb-4 shadow-sm" style={{ backgroundColor: brandData.colors[1].hex }}>S</div>
                      <h4 className="font-bold text-sm mb-1">Sastra</h4>
                      <p className="text-[10px] text-slate-500">Media peradaban.</p>
                    </div>
                    <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50">
                      <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-white mb-4 shadow-sm" style={{ backgroundColor: brandData.colors[2].hex }}>L</div>
                      <h4 className="font-bold text-sm mb-1">Loka</h4>
                      <p className="text-[10px] text-slate-500">Ruang lingkup alam.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'colors' && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Spesifikasi Warna HEX</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {brandData.colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-6 p-4 rounded-3xl border border-slate-100 bg-white hover:shadow-md transition-all">
                        <div className="w-24 h-24 rounded-2xl shadow-inner shrink-0" style={{ backgroundColor: color.hex }} />
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{color.name}</h3>
                          <span className="font-mono text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">{color.hex.toUpperCase()}</span>
                          <p className="text-slate-500 text-xs mt-2 leading-relaxed">{color.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'typography' && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Karakter Tipografi</h2>
                  <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-slate-400">Primary Font: Skia</p>
                    <h3 className="text-7xl mb-6 leading-tight font-medium" style={{ color: brandData.colors[3].hex, fontFamily: "'Skia', sans-serif" }}>
                      {brandData.typography.primary}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                      <div className="text-slate-600">
                        <p className="text-2xl mb-4 font-bold" style={{ fontFamily: "'Skia', sans-serif" }}>
                          PT. Lentera Sastra Loka
                        </p>
                        <p className="text-xs opacity-60 leading-relaxed" style={{ fontFamily: "'Skia', sans-serif" }}>
                          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br/>
                          1234567890 &bull; @#!?$%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="animate-in fade-in duration-500 text-center">
                   <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Aturan Pakai</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                         <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                         <h4 className="font-bold mb-2">Gunakan Latar Putih</h4>
                         <p className="text-xs text-slate-500">Untuk menjaga kontras warna Lentera Orange dan Sastra Yellow.</p>
                      </div>
                      <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
                         <XCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                         <h4 className="font-bold mb-2">Jangan Distorsi</h4>
                         <p className="text-xs text-slate-500">Dilarang mengubah proporsi logo secara horizontal maupun vertikal.</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'mockup' && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight text-center">Implementasi Media</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {applications.map((app, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-orange-500">
                               {app.icon}
                            </div>
                            <h4 className="font-bold text-lg">{app.title}</h4>
                          </div>
                          <button onClick={() => setZoomedImage(app)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                            <Maximize className="w-4 h-4" />
                          </button>
                        </div>
                        <div 
                          className="flex-1 min-h-[160px] bg-white rounded-2xl flex items-center justify-center p-4 shadow-inner cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setZoomedImage(app)}
                        >
                           {app.preview}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed italic border-t border-slate-200 pt-3">
                           {app.rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <LogoIcon className="w-10 h-10" />
             <span className="font-bold tracking-tighter text-xl" style={{ color: brandData.colors[3].hex, fontFamily: "'Skia', sans-serif" }}>LENTERA SASTRA LOKA</span>
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Identity Documentation &bull; 2024
          </div>
        </div>
      </footer>

      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-8 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full w-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors z-10"
            >
              <XCircle className="w-6 h-6 text-slate-600" />
            </button>
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-h-[70vh] flex items-center justify-center">
              <img 
                src={zoomedImage.preview.props.src} 
                alt={zoomedImage.preview.props.alt} 
                className="max-w-full max-h-[70vh] object-contain rounded-xl" 
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{zoomedImage.title}</h3>
              <p className="text-slate-300 text-sm max-w-md">{zoomedImage.rule}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
