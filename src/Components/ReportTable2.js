
const ReportTable2 = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Club Name</th>
            <th>Member First Name</th>
            <th>Member Last Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.std_club_name}</td>
              <td>{row.std_club_id}</td>
              <td>{row.fname}</td>
              <td>{row.lname}</td>
              <td>{row.yr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  export default ReportTable2;