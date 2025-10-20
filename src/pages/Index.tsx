import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Martini, Database, Download, Upload } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import ImportExport from "@/components/ImportExport";
import RatingVariations from "@/components/RatingVariations";

const Index = () => {
  const [activeTab, setActiveTab] = useState("log");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary shadow-button">
              <Martini className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Cocktail Review Logger
              </h1>
              <p className="text-sm text-muted-foreground">Fast 30-second reviews • Export to Claude Projects</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1 bg-card shadow-card">
            <TabsTrigger
              value="log"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button py-3 rounded-lg font-medium transition-all"
            >
              <Database className="w-4 h-4 mr-2" />
              Log Review
            </TabsTrigger>
            <TabsTrigger
              value="browse"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button py-3 rounded-lg font-medium transition-all"
            >
              <Martini className="w-4 h-4 mr-2" />
              Browse Reviews
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-button py-3 rounded-lg font-medium transition-all"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import/Export
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="log" className="mt-0">
            <Card className="p-6 shadow-card border-2">
              <ReviewForm />
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="mt-0">
            <Card className="p-6 shadow-card border-2">
              <ReviewList />
            </Card>
          </TabsContent>

          <TabsContent value="data" className="mt-0">
            <Card className="p-6 shadow-card border-2">
              <ImportExport />
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data stored locally in IndexedDB • Export regularly for backup • No data leaves your device</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
