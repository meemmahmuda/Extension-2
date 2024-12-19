// Function to collect specific column data (e.g., "Name", "Age") from a table
function getTableData() {
  const tables = document.querySelectorAll("table");
  const specificColumnsData = [];

  tables.forEach((table) => {
    const headers = table.querySelectorAll("th");

    // Find column indexes for "Name" and "Age"
    const nameIndex = Array.from(headers).findIndex(
      (header) => header.textContent.trim().toLowerCase() === "name"
    );
    const ageIndex = Array.from(headers).findIndex(
      (header) => header.textContent.trim().toLowerCase() === "age"
    );

    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      if (cells.length > 0) {
        // Retrieve "Name" and "Age" data (if available)
        const name = nameIndex !== -1 ? cells[nameIndex]?.textContent.trim() : "";
        const age = ageIndex !== -1 ? cells[ageIndex]?.textContent.trim() : "";

        // Add row data only if at least one column has a value
        if (name || age) {
          specificColumnsData.push([name, age]);
        }
      }
    });
  });

  return specificColumnsData;
}

// Send the table data to the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTableData") {
    sendResponse({ data: getTableData() });
  }
});
