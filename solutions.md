
# CybaVerse technical interview task – My Fixes and Solutions

I focused on making the app feel cleaner, more functional, and secure for users.

## Issue 1
**Fix New Button Misalignment**
The "New" button was misaligned because it wasn’t grouped with the form layout. I moved it inside the .formContainer 
and adjusted its styling so it now sits correctly beneath the form inputs, using the same formItem class for consistent spacing.

## Issue 2
**Fix Name Input Not Appearing When Typed**
The name field wasn’t displaying typed input because it wasn’t connected to the component’s state. 
I fixed it by converting the input to a controlled component binding it to this.state.name and updating the value through onChange.
This ensures the text shows up as the user types.

### Issue 3
**Fix Dropdown Highlighting**
When opening the dropdown, it was hard to tell which item was currently selected. To fix this, I introduced two lines in `Dropdown.jsx`:
const isSelected = this.state.selected === x;
className={`formDropdownItemSelector ${this.props.size}${isSelected ? ' selected' : ''}`}

### Issue 4
**Add Success and Error Feedback for New Records**
Before, submitting a new record gave no feedback—it was confusing. I added:
- A success message when a new record is created.
- Input validation (both on the frontend and backend) to make sure "name" and "type" are required.
- An error message if any required info is missing.

This makes the form feel responsive and trustworthy.

### Issue 5
**Fix XSS Vulnerability**
To stop unsafe input, I used `bleach` library  to clean the name and email fields. This keeps the app secure from script-based attacks.

### Issue 6
**Add Search Filter to Results Page**
I added support for a search query in the /results API and filtered the results based on name.
 It’s now easier for users to find specific records by typing part of a name.

### Issue 7
**Add Email Address Field with Masking**
I added an email field to the form and validated it using Pydantic with a simple @ check. On the results page, 
I mask the email showing only the first few characters and the domain to keep it private.

### Issue 8
**Add Download as CSV**
I added a “Download CSV” button so users can easily export the results. It takes the current data from state.resultsData,
 builds a CSV string using Object.keys() and Object.values(), and then creates a downloadable file using Blob and URL.createObjectURL().
 The file name includes a timestamp for clarity. This makes it really convenient for users to save or analyze their data offline.


Thanks again for reviewing my work!  
 
**Oghenefejiro Macdonald Ejime**
