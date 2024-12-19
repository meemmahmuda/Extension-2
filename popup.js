document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getTableData' }, function (response) {
        const tableData = response.data;
        const tbody = document.querySelector('#table-data tbody');
  
        // Clear any existing table data
        tbody.innerHTML = '';
  
        tableData.forEach(row => {
          const tr = document.createElement('tr');
  
          // Create cells for each column (Name and Age)
          row.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
          });
  
          tbody.appendChild(tr);
        });
      });
    });
  });
  