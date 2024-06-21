import React, { useState, useEffect, useCallback } from 'react';
import CollegeTable from './components/CollegeTable';
import SearchBar from './components/SearchBar';
import collegeData from './data.json';

function App() {
  const [colleges, setColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const itemsPerPage = 10;

  useEffect(() => {
    setColleges(collegeData.colleges);
    setDisplayedColleges(collegeData.colleges.slice(0, itemsPerPage));
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    const filteredColleges = colleges.filter(college =>
      college.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedColleges(filteredColleges.slice(0, itemsPerPage));
    setCurrentPage(1);
  }, [colleges]);

  const handleSort = useCallback((key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  
    const sortedColleges = [...displayedColleges].sort((a, b) => {
      let aValue = a;
      let bValue = b;
      key.split('.').forEach(k => {
        aValue = aValue[k];
        bValue = bValue[k];
      });
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  
    setDisplayedColleges(sortedColleges);
  }, [displayedColleges, sortConfig]);

  const loadMoreColleges = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newColleges = colleges.filter(college =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(startIndex, endIndex);
    
    setDisplayedColleges(prevColleges => [...prevColleges, ...newColleges]);
    setCurrentPage(nextPage);
  }, [colleges, currentPage, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">College List</h1>
      <SearchBar onSearch={handleSearch} />
      <CollegeTable 
        colleges={displayedColleges} 
        onSort={handleSort} 
        sortConfig={sortConfig}
        onLoadMore={loadMoreColleges}
      />
    </div>
  );
}

export default App;