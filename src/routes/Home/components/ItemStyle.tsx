export default ({ children }) => (
  <div className="item-wrap">
    {children}
    <style jsx>{`
      .item-wrap {
        margin-top: 24px;
        width: 150px;
        height: 150px;
      }
    `}
    </style>
  </div>
);
