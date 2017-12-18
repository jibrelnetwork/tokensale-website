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
          isForbidden: 'Issues reported with hanmail.net - please provide a different email address',
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
  account: {
    logout: 'Logout',
    KYCStatus: {
      label: 'KYC status',
      variants: {
        pending: 'Preliminarily Approved',
        approved: 'Approved',
        declined: 'Declined',
      },
    },
    icoNotStartedYet: 'Jibrel Network Token Sale starts on 27 November 2017 - 12:00 UTC.\n Your dedicated BTC and ETH contribution addresses will be shown here once the token sale starts.',
    verificationDeclined: 'It seems we were unable to verify your identity. \n Please contact the support team {{email}} and a representative \n will assist in manually processing your application.',
    ethAddress: 'Your address',
    addEthAddress: '',
    icoAddresses: {
      eth: 'Your ETH Contribution Address',
      btc: 'Your BTC Contribution Address',
    },
    transactions: {
      empty: 'You have yet to make any ETH/BTC contributions or JNT withdrawals. Your contribution and withdrawal transactions will appear here',
      filters: {
        all: 'All transactions',
        incoming: 'Incoming transactions',
        outgoing: 'Outgoing JNT transfers',
      },
      transaction: {
        date: 'Date',
        amount: 'Amount',
        TXHash: 'TX hash',
      },
    },
    setETHAddress: {
      button: 'Add ETH Address',
      title: 'Set Address',
      fields: {
        address: 'Address',
      },
      errors: {
        address: {
          isRequired: 'Address is required',
          invalid: 'Invalid address',
        },
      },
      submit: 'Confirm',
    },
    withdrawTokens: {
      info: {
        available: 'You are about to withdraw {{tokensAmount}} JNT into address {{ethAddress}}',
        unavailable: 'JNT withdrawals will be available starting from 12:00 PM 15th Dec 2017',
      },
      submit: 'Got it!',
    },
    changePassword: {
      button: 'Change password',
      title: 'Set New Password',
      fields: {
        oldPassword: 'Old password',
        newPassword: 'New password',
        newPasswordConfirm: 'Confirm password',
      },
      errors: {
        oldPassword: {
          isRequired: 'Password is required',
        },
        newPassword: {
          isRequired: 'New Password is required',
          isTooShort: 'New Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Passwords should match',
        },
      },
      submit: 'Confirm',
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
        pending: 'You have been preliminarily approved. \n Please note, we may request that you submit additional identity verification in the future',
        approved: 'Your identity has been verified \n and your application has been approved',
        declined: 'We could not verify your identity',
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
      text: 'Jibrel provides traditional financial assets, as ERC-20 tokens, \n on the Ethereum blockchain',
    },
    timer: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    button: 'Get Tokens',
    tokens: {
      raised: 'Allocated Tokens',
      total: 'Total Supply',
    },
  },
}
/* eslint-enable */

export default EN
