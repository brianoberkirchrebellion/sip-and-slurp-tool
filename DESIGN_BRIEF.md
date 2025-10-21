# Cocktail Review Logger - Design Brief

## Project Overview
A fast, efficient cocktail review logging system focused on data capture over complex rating methods. Designed for 30-second reviews with local storage and Claude Projects export capability.

## Design Philosophy
- **Speed First**: Minimize friction in the review logging process
- **Data-Focused**: Simple, consistent rating system (0-10 slider with 0.5 increments)
- **Local-First**: All data stored in IndexedDB, no backend required
- **Export-Ready**: Structured for easy export to Claude Projects for analysis

---

## Page-by-Page Solutions

### 1. Log Review Tab (ReviewForm Component)
**Purpose**: Fast cocktail review entry

**Solutions Implemented**:
- **Single Rating Method**: 0-10 slider with 0.5 increments for consistency
- **Visual Rating Feedback**: Dynamic color-coded display showing rating value and label
- **Progressive Disclosure**: Optional fields (venue, occasion, modifications) hidden in collapsible section
- **Smart Defaults**: Auto-populated date field, pre-focused name input
- **Instant Validation**: Clear required field indicators

**Component Architecture**:
```
ReviewForm
├── Recipe Name Input (required)
├── Rating Slider (0-10, 0.5 steps)
│   └── Dynamic Rating Display (color + label)
├── Date Made Input (default: today)
├── Tasting Notes Textarea (required)
└── Optional Details (Collapsible)
    ├── Venue Input
    ├── Occasion Input
    └── Modifications Textarea
```

**Key Functions**:
- `getRatingColor(value)`: Returns CSS class for rating color
- `getRatingLabel(value)`: Returns text label for rating range
- `handleSubmit()`: Validates and saves review to IndexedDB

---

### 2. Browse Reviews Tab (ReviewList Component)
**Purpose**: Quick review lookup and management

**Solutions Implemented**:
- **Search Functionality**: Filter reviews by recipe name
- **Flexible Sorting**: Sort by date made, date created, name, or rating
- **Visual Rating Cards**: Color-coded cards matching the rating system
- **Comprehensive Display**: All review data visible at a glance
- **Quick Actions**: Delete button on each review

**Component Architecture**:
```
ReviewList
├── Header (total count + description)
├── Controls
│   ├── Search Input (filter by name)
│   └── Sort Dropdown (4 options)
└── Review Cards Grid
    └── Review Card (per review)
        ├── Recipe Name + Rating Badge
        ├── Date Made
        ├── Tasting Notes
        ├── Optional Details (if present)
        ├── Created Timestamp
        └── Delete Button
```

**Key Functions**:
- `getRatingColor(rating)`: Returns background color class
- `getRatingBadge(rating)`: Returns rating category text
- Filter/sort logic (to be implemented with real data)

---

### 3. Import/Export Tab (ImportExport Component)
**Purpose**: Data management and backup

**Solutions Implemented**:
- **Database Status**: Visual indicator of stored reviews count
- **Import Functionality**: Separate imports for recipes and reviews
- **Export Options**: Individual (recipes/reviews) or combined export
- **Claude Projects Ready**: Formats data for AI analysis
- **Danger Zone**: Clear data management with confirmation
- **Format Support**: JSON import/export for easy portability

**Component Architecture**:
```
ImportExport
├── Database Status Card
│   └── Review Count Display
├── Import Section
│   ├── Import Recipes Button
│   └── Import Reviews Button
├── Export Section
│   ├── Export Recipes Button
│   ├── Export Reviews Button
│   └── Export All Button
└── Danger Zone
    └── Clear All Data Button
```

**Key Functions**:
- `handleImportRecipes()`: Process recipe JSON file
- `handleImportReviews()`: Process review JSON file
- `handleExportRecipes()`: Generate recipes JSON
- `handleExportReviews()`: Generate reviews JSON
- `handleExportAll()`: Generate combined JSON
- `handleClearData()`: Clear IndexedDB with confirmation

---

## Design System Components

### Color-Coded Rating System
**Rating Scale** (0-10 with 0.5 increments):
- **9.0-10.0**: Exceptional (purple gradient)
- **7.5-8.5**: Excellent (blue gradient)
- **6.0-7.0**: Very Good (green gradient)
- **4.5-5.5**: Good (yellow gradient)
- **3.0-4.0**: Okay (orange gradient)
- **0-2.5**: Poor (red gradient)

**Implementation**:
- Defined in `index.css` as CSS variables
- Applied via `getRatingColor()` helper functions
- Consistent across form, list, and any rating displays

### UI Components Used
- **shadcn/ui**: Base component library
- **Radix UI**: Accessibility primitives
- **Lucide React**: Icon system
- **Tailwind CSS**: Utility-first styling

### Layout System
- **Responsive Container**: max-w-5xl, centered
- **Card-Based Design**: Consistent shadow and border
- **Tab Navigation**: 3 primary sections
- **Gradient Accents**: Purple-blue gradient for brand elements

---

## Data Structure

### Review Object
```typescript
{
  id: string,              // Unique identifier
  recipeName: string,      // Cocktail name (required)
  rating: number,          // 0-10 in 0.5 increments (required)
  dateMade: string,        // ISO date string (required)
  notes: string,           // Tasting notes (required)
  venue?: string,          // Optional location
  occasion?: string,       // Optional event
  modifications?: string,  // Optional recipe changes
  dateCreated: string      // ISO timestamp
}
```

### Storage
- **Method**: IndexedDB (browser local storage)
- **Database Name**: `cocktail-reviews-db`
- **Object Store**: `reviews`
- **Key Path**: `id`

---

## Technical Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Router**: React Router DOM
- **Storage**: IndexedDB API
- **State**: React useState (local component state)

---

## Performance Optimizations
- **No Backend Calls**: Pure client-side for instant response
- **Minimal Re-renders**: Focused state updates
- **Tree-shakeable Icons**: Only imported icons included
- **Local Storage**: Zero network latency
- **Progressive Enhancement**: Core functionality works, extras are collapsible

---

## Future Considerations
- IndexedDB implementation (currently mock data)
- Advanced filtering (by rating range, date range)
- Recipe template system
- Photo attachments
- Statistics dashboard
- Export to multiple formats (CSV, PDF)
