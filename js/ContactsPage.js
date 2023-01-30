let sortDirection = false;
let contactData = [
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'},
  {firstName: 'Test', lastName: 'Sample', email: 'testsample@gmail.com', phoneNumber: '(555)555-5555', address: '101 Dump Street', city: 'City Harbor', state: 'Idaho'}
];

window.onload = () =>{
  loadTableData(contactData);
}

function loadTableData(contactData)
{
  const tableBody = document.getElementById('tableData');
  let dataHtml = '';

  for (let contact of contactData)
  {
    dataHtml += `<tr><td>${contact.firstName}</td><td>${contact.lastName}</td>
    <td>${contact.email}</td><td>${contact.phoneNumber}</td><td>${contact.address}</td>
    <td>${contact.city}</td><td>${contact.state}</td><td><a class="edit-button" href="#">Edit</a></td>
    <td><a class="delete-button" href="#">Delete</a></td></tr>`;
  }

  console.log(dataHtml)

  tableBody.innerHTML = dataHtml;
}
