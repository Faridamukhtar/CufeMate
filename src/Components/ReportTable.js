
const ReportTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
            <th>Post ID</th>
            <th>Post Date</th>
            <th>Post Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.fname}</td>
              <td>{row.lname}</td>
              <td>{row.std_id}</td>
              <td>{row.post_id}</td>
              <td>{row.post_date}</td>
              <td>{row.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  export default ReportTable;