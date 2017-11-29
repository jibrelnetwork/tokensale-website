/* eslint-disable max-len */
const RU = {
  auth: {
    emailVerification: {
      error: 'Unfortunately, we were unable to validate your email. \n Try again later or contact us via {{email}}',
      success: 'Your email has been verified \n and your can login now!',
      inProgress: 'Validating your email...',
      linkSended: 'An email has been sent to your email address. \n It can take a few minutes before you have it in your inbox. Click the activation link to verify your account!',
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
        newPasswordConfirm: 'New password confirmation',
      },
      errors: {
        newPassword: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Password does not match the confirm password',
          isRequired: 'Password confirmation is required',
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
        resetPassword: 'Forgotten password?',
      },
      submit: 'Login',
    },
    registration: {
      fields: {
        email: 'Email',
        password: 'Password',
        passwordConfirm: 'Password Confirmation',
      },
      errors: {
        email: {
          isRequired: 'Email address is required',
          isInvalid: 'Invalid email address',
        },
        captcha: {
          isRequired: 'Click on captcha checkbox',
        },
        password: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Password does not match the confirm password',
          isRequired: 'Password confirmation is required',
        },
      },
      links: {
        registration: 'Have an account?',
      },
      submit: 'Register',
    },
  },
  account: {
    logout: 'Logout',
    KYCStatus: {
      label: 'KYC status',
      variants: {
        pending: 'Pending',
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
      empty: 'The jWallet makes it easy and safe to store and transfer value of any tokens',
      filters: {
        all: 'All transactions',
        incoming: 'Incoming transactions',
        outgoing: 'JNT transfers',
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
        available: 'You are sending {{tokensAmount}} JNT to your account address {{ethAddress}}',
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
    termsAndConditions: {
      fields: {
        policyConfirm: 'I have read the {{termsLink}}, Privacy Policy and Jibrel Network White Paper, and accept all terms, conditions, obligations, affirmations, representations and warranties outlined in these documents and agree to adhere to them and be legally bound by them',
        citizenshipConfirm: 'I confirm that I am not citizen, permanent resident, or granted indefinite leave to remain in the US, Singapore or China - or any jurisdiction in which the purchase of Jibrel Network Token (JNT) is explicitly prohibited or outlawed.',
      },
      errors: {
        policyConfirm: {
          isRequired: 'Email address is required',
        },
        citizenshipConfirm: {
          isRequired: 'Citizenship confirmation is required',
        },
      },
      submit: 'Next Step',
    },
    userInfo: {
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        birthday: 'Birthday DD/MM/YYYY',
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
      submit: 'Next Step',
    },
    documentUpload: {
      fields: {
        document: 'Upload your passport',
      },
      errors: {
        document: {
          isRequired: 'Upload document scan in order to verify your identity',
        },
      },
    },
    resultsLoader: {
      stages: {
        uploading: 'Uploading document to KYC servers',
        scanning: 'Scanning document for key information',
        validity: 'Checking document validity',
        processing: 'Processing and cleaning information',
        revise: 'Checking OFAC, sanction and watch lists',
        decision: 'Final decision-making',
      },
      results: {
        pending: 'We are currently processing your application. \n Please note, we may request that you submit additional identity verification in the future',
        approved: 'Your identity has been verified \n and your application has been approved',
        declined: "We currently can't verify your identity",
      },
      close: 'Go to dashboard',
    },
  },
  index: {
    header: {
      about: 'О Jibrel Network',
      login: 'Войти',
      logout: 'Выйти',
      account: 'Перейти в аккаунт',
      registration: 'Зарегистрироваться',
      verification: 'Продолжить верификацию',
    },
    info: {
      price: {
        title: 'USD $0.25',
        text: 'Цена за токен',
      },
      currencies: {
        title: 'Эфириум, Биткоин',
        text: 'Принимаемые криптовалюты',
      },
      exchange: {
        title: '1 февраля 2018',
        text: 'JNT токен будет \n размещен на биржах',
      },
      jurisdictions: {
        title: 'Соединенные Штаты Америки',
        text: 'Запрещенные юрисдикции',
      },
    },
    title: {
      header: 'Глобальная токенизация',
      text: 'Jibrel предоставляет традиционные финансовые активы, \n такие как ERC-20 токены, на блокчейне Эфириума',
    },
    timer: {
      days: 'Дней',
      hours: 'Часов',
      minutes: 'Минут',
      seconds: 'Секунд',
    },
    button: 'Купить токены',
    tokens: {
      raised: 'Продано токенов',
      total: 'Всего токенов',
    },
  },
}
/* eslint-enable */

export default RU
