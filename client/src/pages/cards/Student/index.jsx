import React from 'react';

export default function StudentCard({ student }) {
  // const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <p>{student.name}</p>
      <p>{student.surname}</p>
      <p>{student.second_name}</p>
    </div>
  );
}
