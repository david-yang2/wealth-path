const TransactionModal = (props) => {

  const {setOpenEditModal, updateObj} = props


  return (
    <div id="backdrop" 
    className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 backdrop-blur-sm"
    onClick={() => setOpenEditModal(false)}>

    <div className="w-1/2 h-1/2 flex items-center justify-center">
      <div> {updateObj.category}</div>
    </div>
    </div>
  );
};
export default TransactionModal;
