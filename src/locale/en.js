/* eslint-disable max-len */
const EN = {
  auth: {
    emailVerification: {
      error: {
        message: 'Unfortunately, we were unable to verify your email. \n Please verify your email address or contact us via {{email}}',
        email: 'email',
      },
      success: 'Your email has been verified. \n You can now login to your token sale dashboard',
      inProgress: 'Verifying your email...',
      linkSended: 'An email has been sent to your email address. \n It can take a few minutes before it arrives in your inbox. Click the activation link in your email to verify your account!',
      continue: 'Continue',
      complete: 'Login',
    },
    resetPasswordLinkSended: 'An email has been sent to your email address. \n It can take a few minutes before you have it in your inbox. \n Click the recovery link to change your password!',
    sendResetPasswordEmail: {
      fields: {
        email: 'Your email',
      },
      errors: {
        email: {
          isRequired: 'Email address is required',
          invalidFormat: 'Invalid email address',
        },
      },
      submit: 'Change password',
    },
    resetPassword: {
      fields: {
        newPassword: 'New password',
        newPasswordConfirm: 'Confirm new password',
      },
      errors: {
        newPassword: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Password and password confirmation should match',
          isRequired: 'Please confirm your password',
        },
      },
      submit: 'Change password',
    },
    login: {
      fields: {
        email: 'Email',
        password: 'Password',
      },
      errors: {
        email: {
          isRequired: 'Email address is required',
          isInvalid: 'Invalid email address',
        },
        captcha: {
          isRequired: 'Please complete captcha',
        },
        password: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
      },
      links: {
        resendEmail: "Didn't receive email?",
        resetPassword: 'Forgot password?',
      },
      submit: 'Login',
    },
    registration: {
      fields: {
        email: 'Email',
        password: 'Password',
        passwordConfirm: 'Confirm password',
      },
      errors: {
        email: {
          isInvalid: 'Invalid email address',
          isRequired: 'Email address is required',
        },
        captcha: {
          isRequired: 'Please complete captcha',
        },
        password: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
        passwordConfirm: {
          notMatch: 'Password and password confirmation should match',
          isRequired: 'Please confirm your password',
        },
      },
      links: {
        login: 'Already have an account?',
      },
      submit: 'Register',
    },
  },
  confirmations: {
    withdraw: {
      fail: "We can't confirm your JNT withdraw, please try again later or contact us via email",
      success: 'Your JNT withdraw confirmed successfully!',
      request: 'Withdraw confirmation...',
    },
    changeAddress: {
      fail: "We can't confirm your ETH address change, please try again later or contact us via email",
      success: 'Your ETH address changed successfully!',
      request: 'ETH address change confirmation...',
    },
  },
  account: {
    menu: 'Menu',
    logout: 'Logout',
    balance: 'Balance - {{amount}}',
    support: 'Support',
    KYCStatus: {
      label: 'KYC status - {{status}}',
      variants: {
        pending: 'Pending',
        approved: 'Approved',
        declined: 'Declined',
        'preliminarily approved': 'Preliminarily Approved',
      },
    },
    uploadDocument: 'Upload document',
    changeETHAddress: 'Change ETH address',
    verificationDeclined: {
      message: 'It seems we were unable to verify your identity. \n Please contact the {{support}} and a representative \n will assist in manually processing your application.',
      support: 'support team',
    },
    ethAddress: 'Your address',
    icoAddresses: {
      eth: 'Your ETH Contribution Address',
      btc: 'Your BTC Contribution Address',
      notAvailable: 'Not available',
    },
    withdraw: {
      button: 'Withdraw',
      confirm: {
        text: 'You are sending {{amount}} to the address {{address}}',
        button: 'Confirm',
      },
      notApproved: {
        text: "Your KYC status still isn't approved. Please, wait while your identity will be \n verified, or pass KYC check again if it was declined.",
        button: 'Got it!',
      },
      emptyBalance: {
        text: "You don't have any JNT to withdraw.",
        button: 'Ok',
      },
      emptyAddress: {
        text: 'Please, specify ETH address to withdraw your JNT.',
        button: 'Ok',
      },
      withdrawRequested: {
        text: 'An email has been sent to your email address. Click the confirmation link to withdraw \n your funds!',
        button: 'Got it!',
      },
    },
    KYC: {
      close: 'Got It!',
      support: 'Contacting Support Team',
      statuses: {
        pending: 'You have yet to submit your KYC documentation. \n Upload Documents or verify your documentation by {{support}}',
        approved: 'Your KYC documentation and identity have been verified. \n Your submission is complete.',
        declined: 'Your KYC documentation was declined. We’ve sent you an email explaining why. \n Please contact the sales team for further assistance.',
        'preliminarily approved': 'Your KYC submission was preliminarily approved but requires manual verification.',
      },
    },
    transactions: {
      empty: 'Your ETH / BTC contributions will be displayed here. Transactions can take up to 90 minutes to appear',
      filters: {
        all: 'All transactions',
        incoming: 'Incoming transactions',
        outgoing: 'Outgoing JNT transfers',
      },
      transaction: {
        date: 'Date',
        amount: 'Amount',
        TXHash: 'TX hash',
        comment: 'Comment',
      },
    },
    setETHAddress: {
      title: 'Set ETH Address',
      button: 'Add ETH Address',
      confirm: 'An email has been sent to your email address. \n Click the confirmation link to update your withdrawal ETH address!',
      fields: {
        address: 'Address',
      },
      errors: {
        address: {
          isRequired: 'Address is required',
          isInvalid: 'Invalid address',
        },
      },
      close: 'Ok',
      submit: 'Confirm',
      addressWarning: 'Please ensure to avoid withdrawing tokens to exchange accounts. Please use a non-exchange Ethereum address to avoid losing your tokens.',
    },
    withdrawTokens: {
      info: {
        available: 'You are about to withdraw {{tokensAmount}} JNT into address {{ethAddress}}',
        unavailable: 'JNT withdrawals will be available starting from 12:00 PM 15th Dec 2017',
      },
      submit: 'Got it!',
    },
    changePassword: {
      title: 'Change Password',
      close: 'Close',
      repeat: 'Repeat',
      submit: 'Change password',
      button: 'Change password',
      failure: "We currently can't confirm your password change, please try again later",
      request: 'Requesting password change...',
      success: 'An email has been sent to your address. \n Click the confirmation link to change your password',
      confirm: 'If you want to change your password please click on button below',
    },
  },
  verification: {
    logout: 'Logout',
    stages: {
      terms: 'Terms & Conditions',
      userInfo: 'Basic Information',
      document: 'Identity Image',
    },
    terms: {
      link: {
        text: 'Token Sale Terms & Conditions',
        source: '/static/T&Cs - Jibrel Network Token Sale.pdf',
      },
      fields: {
        policyConfirm: 'I have read the {{link}}, Privacy Policy and Jibrel Network White Paper, and accept all terms, conditions, obligations, affirmations, representations and warranties outlined in these documents and agree to adhere to them and be legally bound by them',
        citizenshipConfirm: 'I confirm that I am not a citizen, permanent resident, or granted indefinite leave to remain in the United States or any US territories - as well as any jurisdiction in which the purchase of Jibrel Network Token (JNT) is explicitly prohibited or outlawed.',
      },
      errors: {
        policyConfirm: {
          isRequired: 'Policy agreement confirm is required',
        },
        citizenshipConfirm: {
          isRequired: 'Citizenship field is required',
        },
      },
      submit: 'Next',
    },
    userInfo: {
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        birthday: 'Birthday',
        residency: 'Residency',
        citizenship: 'Citizenship',
      },
      errors: {
        firstName: {
          isRequired: 'First name is required',
        },
        lastName: {
          isRequired: 'Last name is required',
        },
        birthday: {
          isRequired: 'Birthday is required',
        },
        residency: {
          isRequired: 'Residency is required',
        },
        citizenship: {
          isRequired: 'Citizenship is required',
        },
      },
      submit: 'Next',
    },
    document: {
      modal: {
        close: 'Upload now',
        message: 'Verification is required to withdraw your JNT. You can complete this step at a later stage.',
        skipUpload: 'Upload later',
      },
      fields: {
        uploader: 'Upload your passport',
      },
      errors: {
        uploader: {
          isRequired: 'Upload document scan in order to verify your identity',
        },
      },
      skip: 'Skip for now',
      goBack: 'Previous Step',
      submit: 'Next',
    },
    loader: {
      stages: {
        uploading: 'Uploading document to KYC servers',
        scanning: 'Scanning document for key information',
        validity: 'Checking document validity',
        processing: 'Processing and cleaning information',
        revise: 'Checking OFAC, sanction and watch lists',
        decision: 'Final decision-making',
      },
      results: {
        approved: 'Your identity has been verified \n and your application has been approved',
        declined: 'We could not verify your identity',
        'preliminarily approved': 'You have been preliminarily approved. \n Please note, we may request that you submit additional identity verification in the future',
      },
      close: 'Go to dashboard',
    },
  },
  index: {
    header: {
      about: 'About Jibrel Network',
      login: 'Sign In',
      logout: 'Logout',
      account: 'Go to dashboard',
      registration: 'Sign Up',
      verification: 'Complete verification',
    },
    info: {
      price: {
        title: 'USD $0.25',
        text: 'Price per token',
      },
      currencies: {
        title: 'Ethereum, Bitcoin',
        text: 'Accepted currencies',
      },
      exchange: {
        title: 'Feb 1st 2018',
        text: 'JNT listed on exchanges',
      },
      jurisdictions: {
        title: 'United States',
        text: 'Restricted Jurisdictions',
      },
    },
    title: {
      header: 'Tokenize Everything',
      text: 'Our token sale has ended. Thank you for your support.',
    },
    timer: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    button: 'Checking your balance',
    button2: 'Adding JNT into wallets',
    tokens: {
      raised: 'Allocated Tokens',
      total: 'Total Supply',
    },
  },
}
/* eslint-enable */

export default EN
