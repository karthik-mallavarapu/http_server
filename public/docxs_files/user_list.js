var UserItem = React.createClass({
  displayName: "UserItem",

  render: function () {
    var accountListSample = [{ "email": "karthik@gmail.com", "member": "false", "id": "1" }, { "email": "puneeth@gmail.com", "member": "true", "id": "2" }, { "email": "docxs@gmail.com", "member": "true", "id": "3" }, { "email": "john@gmail.com", "member": "false", "id": "4" }, { "email": "dileep@gmail.com", "member": "true", "id": "5" }];
    return React.createElement(
      "div",
      { className: "list-group-item" },
      this.props.email,
      React.createElement(AccountList, { accounts: JSON.stringify(accountListSample) })
    );
  }
});
var UserList = React.createClass({
  displayName: "UserList",

  usersJSON: function () {
    return JSON.parse(this.props.users);
  },
  render: function () {
    var users = this.usersJSON();
    return React.createElement(
      "div",
      { className: "list-group" },
      users.map(function (user) {
        return React.createElement(UserItem, { email: user.email, members: user.members });
      })
    );
  }
});