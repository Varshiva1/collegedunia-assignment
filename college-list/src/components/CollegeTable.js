import React, { useEffect, useRef, useCallback } from 'react';

function CollegeTable({ colleges, onSort, sortConfig, onLoadMore }) {
  const observer = useRef();
  const lastCollegeRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    onLoadMore();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('qsRank')}>
            QS INDIA
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('name')}>
            COLLEGES
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('courseFees')}>
            COURSE FEES
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('placement.average')}>
            PLACEMENT
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('userReview')}>
            USER REVIEWS
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort('ranking.overall')}>
            RANKING
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {colleges.map((college, index) => (
          <tr key={college.id} className={college.featured ? 'bg-yellow-50' : ''} ref={index === colleges.length - 1 ? lastCollegeRef : null}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {college.qsRank}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={college.logo} alt="" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{college.name}</div>
                  {college.jeeAdvancedCutoff && (
                    <div className="text-sm text-gray-500">JEE Advanced {new Date().getFullYear()} Cutoff: {college.jeeAdvancedCutoff}</div>
                  )}
                  <div className="mt-2 flex space-x-2">
                    <button className="px-2 py-1 bg-orange-500 text-white text-xs rounded">Apply Now</button>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-xs">Download Brochure</a>
                    <label className="flex items-center space-x-1 text-xs">
                      <input type="checkbox" className="form-checkbox h-3 w-3" />
                      <span>Add to Compare</span>
                    </label>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(college.courseFees)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">Average: {formatCurrency(college.placement.average)}</div>
              <div className="text-sm text-gray-500">Highest: {formatCurrency(college.placement.highest)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {college.userReview} / 10
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">#{college.ranking.overall} in India</div>
              <div className="text-sm text-gray-500">{college.ranking.year}</div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(100 - college.ranking.overall) / 100 * 100}%` }}></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CollegeTable;