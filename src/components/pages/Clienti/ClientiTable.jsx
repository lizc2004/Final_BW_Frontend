/// solo tabelle 

import ClienteRow from "./ClienteRow";

const ClientiTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ragione sociale</th>
          <th>Provincia</th>
          <th>Fatturato annuo</th>
          <th>Ultimo contatto</th>
          <th>Fatture</th>
        </tr>
      </thead>

      <tbody>
        <ClienteRow />
      </tbody>
    </table>
  );
};

export default ClientiTable;