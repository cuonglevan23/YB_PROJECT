import { memo, useState } from "react";
import { SearchBar } from "../components/ui/inputs";

const ExamplePage = memo(function ExamplePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = () => {
    // Simulate search functionality
    const mockResults = [
      "Result 1: " + searchQuery,
      "Result 2: " + searchQuery,
      "Result 3: " + searchQuery,
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Example Page with SearchBar</h1>

        {/* Different sizes of SearchBar */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Small SearchBar</h2>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search small..."
              size="sm"
              onSearchClick={handleSearch}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Medium SearchBar (Default)
            </h2>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search medium..."
              size="md"
              onSearchClick={handleSearch}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Large SearchBar</h2>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search large..."
              size="lg"
              onSearchClick={handleSearch}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              SearchBar without Search Button
            </h2>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="No search button..."
              showSearchButton={false}
              onSearchClick={handleSearch}
            />
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
            <ul className="space-y-2">
              {searchResults.map((result, index) => (
                <li key={index} className="bg-gray-800 p-3 rounded-lg">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

export default ExamplePage;
