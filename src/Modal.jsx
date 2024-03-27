export function Modal(props) {
  if (props.show) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
        <section className="bg-white w-4/5 md:w-1/2 p-4 relative">
          {props.children}
          <button
            type="button"
            onClick={props.onClose}
            className="text-4xl text-black absolute top-0 right-2 bg-transparent border-none"
          >
            <i className="bx bx-x fixed text-4xl text-black z-[1001]" />
          </button>
        </section>
      </div>
    );
  } else {
    return null;
  }
}
