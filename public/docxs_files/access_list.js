var AccessList = React.createClass({
  displayName: "AccessList",

  getInitialState: function () {
    var users = JSON.parse(this.props.users);
    return { users: JSON.parse(this.props.users) };
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-4" },
        React.createElement(UserList, { users: this.props.users })
      )
    );
  }
});