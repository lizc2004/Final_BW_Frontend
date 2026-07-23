// ricerca, select Ordina, select Tipo, pulsante nuovo cliente

const ClientiToolbar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Cerca cliente..."
      />

      <button>
        Nuovo cliente
      </button>
    </div>
  );
};

export default ClientiToolbar;