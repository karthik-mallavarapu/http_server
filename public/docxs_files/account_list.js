var Account = React.createClass({
  displayName: "Account",

  getInitialState: function () {
    return { checked: this.props.checked };
  },
  handleClick: function () {
    var newState = !this.state.checked;
    this.setState({ checked: newState });
    this.props.updateList({ email: this.props.email, member: newState });
  },
  render: function () {
    return React.createElement(
      "div",
      { onChange: this.handleClick, className: "list-group-item checkbox" },
      React.createElement(
        "label",
        null,
        React.createElement("input", { type: "checkbox", checked: this.props.checked }),
        this.props.email
      )
    );
  }
});
var AccountList = React.createClass({
  displayName: "AccountList",

  onAccountChange: function (data) {
    console.log(data);
  },
  accountsJSON: function () {
    return JSON.parse(this.props.accounts);
  },
  render: function () {
    var accounts = this.accountsJSON();
    return React.createElement(
      "div",
      { className: "list-group account-list" },
      accounts.map(function (account) {
        return React.createElement(Account, { key: account.id, checked: account.member, id: account.id, email: account.email,
          updateList: this.onAccountChange });
      })
    );
  }
});