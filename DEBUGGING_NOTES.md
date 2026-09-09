# Debugging Notes & Resolution Log

This document details identified issues, root cause analyses, debugging steps, and solutions implemented during the development of the Employee Management Dashboard.

---

## 1. Pagination Reset Issue on Search/Filter

### 1. Frontend Bug Encountered
When navigating to page 2 or higher and subsequently applying a search query or department filter, the displayed employee table appeared empty even though matching results existed in the dataset.

### 2. Cause of the Issue (Root Cause Analysis)
The state variable `currentPage` remained set to its previous value (e.g., page 2). When a search or department filter was applied that yielded fewer total results (e.g., 3 records total), calculating `paginatedEmployees` with `currentPage = 2` sliced array indices beyond the bounds of the filtered array (`processedEmployees.slice(5, 10)`), returning an empty array and producing an empty table view.

### 3. Steps Taken to Debug It
1. **Observed Behavior**: Navigated to Page 2 of the employee table and typed a query into the search bar (or selected a department filter). The table displayed "No employees found" despite matching items existing in the total mock dataset.
2. **Inspected State**: Used browser developer tools and React state inspection / `console.log` statements to monitor `currentPage`, `searchTerm`, `selectedDept`, and the derived `paginatedEmployees` array.
3. **Identified the Boundary Flaw**: Noticed that `processedEmployees` correctly had matching records, but because `currentPage` was still set to `2`, `ITEMS_PER_PAGE * (currentPage - 1)` began slicing from index 5 onwards on an array with fewer than 5 items.
4. **Tested Solution**: Verified that manually resetting `currentPage` to 1 upon any filter/search change restored the view and correctly displayed the matching results from the first page.

### 4. How It Was Fixed
Implemented a React `useEffect` hook listening to changes in `searchTerm` and `selectedDept` to reset `currentPage` back to `1` automatically whenever search or filter criteria change:

```javascript
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, selectedDept]);
```