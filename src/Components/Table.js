import React from 'react';

const Table = ({ titles, members, enroll,unenroll }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '10px', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            {titles.map((title, index) => (
              <th key={index} style={{ padding: '10px' }}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} style={{ borderBottom: '1px solid #ddd' }}>
              {titles.map((title, index) => (
                <td key={index} style={{ padding: '10px' }}>
                  {member[title.toLowerCase()]}
                </td>
              ))}
              <td style={{ padding: '10px' }}>
              <button style={{width:'auto' , backgroundColor: '#222537' }}onClick={() => enroll(member.id)}>
                  Enroll
                </button>
              </td>
              <td style={{ padding: '10px' }}>
              <button style={{width:'auto' , backgroundColor: '#222537' }}onClick={() => unenroll(member.id)}>
                  Unenroll
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
