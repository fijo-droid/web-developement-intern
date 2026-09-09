# Debugging Notes & Resolution Log

This document details identified issues, root cause analyses, and solutions implemented during the development of the Employee Management Dashboard.

---

## 1. Pagination Reset Issue on Search/Filter

### Bug Description
When navigating to page 2 or higher and subsequently applying a search query or department filter, the displayed table often appeared empty even though matching results existed in the total dataset.

### Root Cause Analysis
The state variable `currentPage` remained set to its previous value (e.g., page 2). When a filter was applied that yielded fewer total results (e.g., 3 records total), calculating `paginatedEmployees` with `currentPage = 2` sliced array indices beyond the bounds of the filtered array, producing an empty view.

### Resolution
Implemented a React `useEffect` hook listening to updates on `searchTerm` and `selectedDept` to reset `currentPage` back to `1` automatically whenever search or filter criteria change.

```javascript
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, selectedDept]);
```