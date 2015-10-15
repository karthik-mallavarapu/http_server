var UserSignupForm = React.createClass({
  displayName: 'UserSignupForm',

  validateEmail: function (email) {
    if (email.length === 0) {
      return false;
    }
    var domain = email.replace(/.*@/, '');
    var domainRegexp = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
    if (DOMAIN_CHECKLIST.indexOf(domain) === -1 && domainRegexp.test(domain)) {
      return true;
    } else {
      return false;
    }
  },
  handleEmailInput: function (e) {
    var email = $('#input-email').val();
    console.log(email);
    if (this.validateEmail(email)) {} else {
      e.preventDefault();
      $('#email-invalid-tooltip').show();
    }
  },
  render: function () {
    return React.createElement(
      'form',
      { className: 'form-inline user-signup-form', method: 'post',
        action: this.props.postURL },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('input', { type: 'email', className: 'form-control input-lg', id: 'input-email',
          name: 'user[email]', placeholder: 'you@company.com', required: true, autoFocus: 'true' }),
        React.createElement(
          'div',
          { id: 'email-invalid-tooltip', className: 'tooltip text-center fade bottom in' },
          React.createElement('div', { className: 'tooltip-arrow' }),
          React.createElement(
            'div',
            { className: 'tooltip-inner' },
            'Please enter a valid email'
          )
        )
      ),
      React.createElement('input', { name: 'authenticity_token', type: 'hidden',
        value: $('meta[name="csrf-token"]')[0].content }),
      React.createElement(
        'button',
        { type: 'submit', onClick: this.handleEmailInput, className: 'btn btn-lg std-btn' },
        this.props.btnName
      )
    );
  }
});