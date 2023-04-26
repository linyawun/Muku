function CheckoutSteps({ data }) {
  return (
    <div className='checkout-steps mb-4'>
      {data.map((item, index) => {
        return (
          <div
            className={`checkout-item ${
              item.done ? 'checkout-done' : 'checkout-undone'
            }`}
            key={index}
          >
            <div>{item.step}</div>
            <div>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}
export default CheckoutSteps;
