import React from 'react';

const Table = ({ titles, members, onRemoveMember }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '10px', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>        
              <th  style={{ padding: '10px' }}>
                First Name
              </th>
              <th  style={{ padding: '10px' }}>
                Last Name
              </th>
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
              <button style={{width:'auto' , backgroundColor: '#222537' }}onClick={() => onRemoveMember(member.id)}>
                  Remove
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


