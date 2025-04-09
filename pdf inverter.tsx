import { useState, useRef, useEffect } from 'react';
import { Upload, Download, X, Sun, Moon, Home, Info, Mail, FileText } from 'lucide-react';
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";

type PageType = 'home' | 'about' | 'contact' | 'features';

export default function PDFInverterApp() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setIsReady(false);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleInvert = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsReady(true);
    }, 2000);
  };

  const handleDownload = () => {
    if (!file) return;
    alert(`Downloading inverted version of ${fileName}`);
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setIsReady(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">PDF Background Inverter</h2>
              <p className="text-muted-foreground">Transform your PDFs with one click</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Your PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pdf-upload">Select PDF File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    {file && (
                      <Button variant="ghost" size="icon" onClick={handleReset}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {file && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                        <span className="text-xs">PDF</span>
                      </div>
                      <div>
                        <p className="font-medium">{fileName}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>

                    {!isReady && (
                      <Button
                        className="w-full mt-4"
                        onClick={handleInvert}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Invert Colors
                          </span>
                        )}
                      </Button>
                    )}

                    {isReady && (
                      <div className="mt-4 space-y-2">
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-2 rounded text-sm">
                          PDF colors inverted successfully!
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleDownload}
                        >
                          <span className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Inverted PDF
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About PDF Inverter</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p>
                  PDF Inverter is a powerful tool designed to help you easily invert the colors of your PDF documents.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold">SV</span>
                  </div>
                  <div>
                    <p className="font-medium">Sonu Verma</p>
                    <p className="text-sm text-muted-foreground">Creator & Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Contact Us</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <p>contact@pdfinverter.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'features':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <FileText className="text-primary" />
                  </div>
                  <CardTitle>PDF Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload and process PDF files of any size.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <Download className="text-primary" />
                  </div>
                  <CardTitle>Easy Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Download your processed files instantly.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold">PI</span>
            </div>
            <h1 className="text-xl font-bold">PDF Inverter</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant={currentPage === 'home' ? 'secondary' : 'ghost'} 
                onClick={() => setCurrentPage('home')}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant={currentPage === 'features' ? 'secondary' : 'ghost'} 
                onClick={() => setCurrentPage('features')}
              >
                Features
              </Button>
              <Button 
                variant={currentPage === 'about' ? 'secondary' : 'ghost'} 
                onClick={() => setCurrentPage('about')}
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
              <Button 
                variant={currentPage === 'contact' ? 'secondary' : 'ghost'} 
                onClick={() => setCurrentPage('contact')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </nav>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Button 
            variant={currentPage === 'home' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPage('home')}
          >
            <Home className="h-4 w-4" />
          </Button>
          <Button 
            variant={currentPage === 'features' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPage('features')}
          >
            Features
          </Button>
          <Button 
            variant={currentPage === 'about' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPage('about')}
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button 
            variant={currentPage === 'contact' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setCurrentPage('contact')}
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">PI</span>
              </div>
              <p className="text-sm">PDF Inverter - Transform your documents</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Developed with ❤️ by Sonu Verma
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}