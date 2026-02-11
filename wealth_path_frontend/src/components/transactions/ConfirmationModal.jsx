import { removeEntry, getTransactions } from "./transactionsApi";

const ConfirmationModal = (props) => {
  const { setConfirmToggle, setOpenEditModal, transactionEntry, setTransactions } = props;
  console.log(transactionEntry);

  const handleDelete = () => {
        removeEntry(transactionEntry.id)
        getTransactions()
        .then(data=> setTransactions(data))
        .catch(err => console.error(err))
        setConfirmToggle(false);
  }

  return (
    <div
      id="confirmation-backdrop"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={() => setConfirmToggle(false)}
    >
      <div
        className="flex flex-col items-center bg-white py-10 px-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Are you sure you want to delete this?</h1>
        <div className="mt-3">
          {/* delete the entry and close the confirmation modal */}
          <button
            className="bg-green-500 mr-6"
            onClick={handleDelete}
          >
            Yes
          </button>
          {/* close confirmation and re-open edit modal */}
          <button
            onClick={() => {
              setConfirmToggle(false);
              setOpenEditModal(true);
            }}
            className="bg-red-500"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
