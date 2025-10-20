import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, Download, Database, FileJson, AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ImportExport = () => {
  const handleImportRecipes = () => {
    toast.success("Recipe import started");
  };

  const handleImportReviews = () => {
    toast.success("Review import started");
  };

  const handleExportRecipes = () => {
    toast.success("Recipes exported");
  };

  const handleExportReviews = () => {
    toast.success("Reviews exported");
  };

  const handleExportAll = () => {
    toast.success("All data exported");
  };

  const handleClearData = () => {
    toast.error("Data clearing requires confirmation");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b">
        <h2 className="text-2xl font-bold mb-1">Import recipe data & export your progress</h2>
        <p className="text-sm text-muted-foreground">
          Start by importing your recipe JSON to enable autocomplete
          <br />
          Export regularly to backup your review sessions for Claude Projects
        </p>
      </div>

      {/* Database Status */}
      <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Database Status</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-3xl font-bold text-primary mb-1">131</div>
            <div className="text-sm text-muted-foreground">Recipes</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-3xl font-bold text-secondary mb-1">16</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
        </div>
      </Card>

      <Separator />

      {/* Import Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Import Data</h3>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Import Recipes */}
          <Card className="p-5 border-2 hover:border-primary/50 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileJson className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Label className="font-semibold text-base">Import Recipes (JSON)</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Load your cocktail recipe database for autocomplete
                </p>
              </div>
            </div>
            <Button
              onClick={handleImportRecipes}
              className="w-full bg-gradient-primary shadow-button hover:shadow-lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </Card>

          {/* Import Reviews */}
          <Card className="p-5 border-2 hover:border-secondary/50 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <FileJson className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <Label className="font-semibold text-base">Import Reviews (JSON)</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Restore previous review sessions
                </p>
              </div>
            </div>
            <Button
              onClick={handleImportReviews}
              className="w-full bg-gradient-secondary shadow-button hover:shadow-lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Export Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-accent" />
          <h3 className="text-xl font-bold">Export Data</h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Button
            onClick={handleExportRecipes}
            variant="outline"
            className="h-auto py-4 flex-col items-start gap-2 border-2 hover:border-primary hover:bg-primary/5"
          >
            <Download className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold">Export Recipes</div>
              <div className="text-xs text-muted-foreground font-normal">Download recipe database</div>
            </div>
          </Button>

          <Button
            onClick={handleExportReviews}
            variant="outline"
            className="h-auto py-4 flex-col items-start gap-2 border-2 hover:border-secondary hover:bg-secondary/5"
          >
            <Download className="w-5 h-5 text-secondary" />
            <div className="text-left">
              <div className="font-semibold">Export Reviews</div>
              <div className="text-xs text-muted-foreground font-normal">Download review history</div>
            </div>
          </Button>

          <Button
            onClick={handleExportAll}
            variant="outline"
            className="h-auto py-4 flex-col items-start gap-2 border-2 hover:border-accent hover:bg-accent/5"
          >
            <Download className="w-5 h-5 text-accent" />
            <div className="text-left">
              <div className="font-semibold">Export All Data</div>
              <div className="text-xs text-muted-foreground font-normal">Complete backup</div>
            </div>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-2 border-destructive/20 bg-destructive/5">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-bold text-destructive">Danger Zone</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            This will permanently delete all recipes and reviews from the IndexedDB database.
            <br />
            <strong className="text-foreground">Make sure to export your data first if you want to keep it!</strong>
          </p>

          <Button
            onClick={handleClearData}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Built for reliable data entry → export to Claude Project for AI analysis
          <br />
          Data stored locally in IndexedDB (crash-resistant) • Export regularly for backup • No data leaves your device
        </p>
      </div>
    </div>
  );
};

export default ImportExport;
